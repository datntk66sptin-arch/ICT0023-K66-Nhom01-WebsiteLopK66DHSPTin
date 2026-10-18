(() => {
  "use strict";

  // Lấy dữ liệu danh sách thành viên từ tenthanhvien.js
  const rosterMembers = (window.CLASS_ROSTER || []).map(person => ({...person}));
  let members = rosterMembers.map(person => ({...person}));
  
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  
  const setNotice = (element, message, type) => {
    if (!element) return;
    element.className = `alert alert-${type}`;
    element.textContent = message;
  };

  // Tự động điền năm hiện tại ở chân trang
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Đánh dấu menu active cho trang hiện tại
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Xử lý bộ sưu tập ảnh lớp
  const photoPicker = document.querySelector("#class-photo-input");
  if (photoPicker) {
    const photoUrls = [];
    const photoSlides = document.querySelector("#class-gallery-slides") || document.querySelector("#trinh-chieu-anh-lop .carousel-inner");
    const photoIndicators = document.querySelector("#class-gallery-indicators") || document.querySelector("#trinh-chieu-anh-lop .carousel-indicators");
    const gallery = document.querySelector("#class-gallery") || document.querySelector("#trinh-chieu-anh-lop");
    const photoCount = document.querySelector("#class-photo-count");
    const photoMessage = document.querySelector("#class-photo-message");
    const clearPhotos = document.querySelector("#clear-class-photos");

    const showEmptyGallery = () => {
      if (photoSlides) {
        photoSlides.innerHTML = `<div class="carousel-item active"><div class="gallery-empty"><div class="gallery-empty-copy"><span>ALBUM LỚP HỌC</span><strong>Ảnh lớp sẽ hiện ở đây</strong><small>Chọn ảnh từ thiết bị để bắt đầu bộ sưu tập.</small></div></div></div>`;
      }
      if (photoIndicators) photoIndicators.innerHTML = "";
      if (gallery) {
        const prev = gallery.querySelector(".carousel-control-prev");
        const next = gallery.querySelector(".carousel-control-next");
        if (prev) prev.hidden = true;
        if (next) next.hidden = true;
      }
      if (photoCount) photoCount.textContent = "Chưa chọn ảnh";
      if (clearPhotos) clearPhotos.disabled = true;
    };

    const renderPhotos = () => {
      if (!photoSlides) return;
      photoSlides.innerHTML = photoUrls.map((item, index) => `<div class="carousel-item${index === 0 ? " active" : ""}"><img src="${item.url}" alt="Ảnh lớp K66, ảnh ${index+1}"${index === 0 ? "" : " loading=\"lazy\""}></div>`).join("");
      if (photoIndicators) {
        photoIndicators.innerHTML = photoUrls.map((_, index) => `<button type="button" data-bs-target="#${gallery.id}" data-bs-slide-to="${index}"${index === 0 ? ' class="active" aria-current="true"' : ""} aria-label="Chuyển tới ảnh ${index+1}"></button>`).join("");
      }
      const multiple = photoUrls.length > 1;
      const prev = gallery.querySelector(".carousel-control-prev");
      const next = gallery.querySelector(".carousel-control-next");
      if (prev) prev.hidden = !multiple;
      if (next) next.hidden = !multiple;
      if (photoCount) photoCount.textContent = `Đã chọn ${photoUrls.length} / 8 ảnh`;
      if (clearPhotos) clearPhotos.disabled = false;
      bootstrap.Carousel.getOrCreateInstance(gallery, {interval: false, wrap: true, touch: true}).to(0);
    };

    photoPicker.addEventListener("change", event => {
      const picked = [...(event.target.files || [])];
      if (!picked.length) return;
      const available = Math.max(0, 8 - photoUrls.length);
      const good = picked.filter(file => file.type.startsWith("image/") && file.size <= 8 * 1024 * 1024).slice(0, available);
      const skipped = picked.length - good.length;
      good.forEach(file => photoUrls.push({url: URL.createObjectURL(file)}));
      if (photoUrls.length) renderPhotos();
      if (skipped) setNotice(photoMessage, `Đã bỏ qua ${skipped} tệp. Chỉ nhận ảnh tối đa 8 MB mỗi tệp và tối đa 8 ảnh.`, "warning");
      else setNotice(photoMessage, `Đã thêm ${good.length} ảnh. Ảnh chỉ hiển thị trong phiên trình duyệt này.`, "success");
      photoPicker.value = "";
    });

    if (clearPhotos) {
      clearPhotos.addEventListener("click", () => {
        photoUrls.forEach(item => URL.revokeObjectURL(item.url));
        photoUrls.length = 0;
        bootstrap.Carousel.getInstance(gallery)?.dispose();
        if (photoMessage) photoMessage.className = "alert d-none mt-3";
        showEmptyGallery();
      });
    }
  }

  // Chuyển đổi tiếng Việt có dấu thành không dấu
  function removeVietnameseTones(str) {
    return String(str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  // Lọc và sắp xếp danh sách thành viên
  function filteredMembers(query, role, order) {
    const normalized = removeVietnameseTones(query.trim().toLocaleLowerCase("vi"));
    return members.filter(person => {
      const targetText = removeVietnameseTones(`${person.name} ${person.role}`.toLocaleLowerCase("vi"));
      const matchesText = targetText.includes(normalized);
      return matchesText && (role === "all" || person.role === role);
    }).sort((a, b) => {
      const givenName = name => name.trim().split(/\s+/).pop();
      const byGivenName = givenName(a.name).localeCompare(givenName(b.name), "vi", {sensitivity: "base"});
      return (byGivenName || a.name.localeCompare(b.name, "vi", {sensitivity: "base"})) * (order === "desc" ? -1 : 1);
    });
  }

  // Tạo tùy chọn bộ lọc chức vụ
  function populateRoleOptions(selector, allLabel) {
    const select = document.querySelector(selector);
    if (!select) return;
    const previous = select.value;
    const roles = [...new Set(members.map(person => person.role))].sort((a, b) => a.localeCompare(b, "vi"));
    select.innerHTML = `<option value="all">${escapeHtml(allLabel)}</option>` + roles.map(role => `<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`).join("");
    select.value = roles.includes(previous) ? previous : "all";
  }

  // Hiển thị danh sách thẻ thành viên
  function renderMemberCards() {
    const grid = document.querySelector("#member-grid");
    if (!grid) return;
    const queryEl = document.querySelector("#member-search");
    const roleEl = document.querySelector("#role-filter");
    const orderEl = document.querySelector("#sort-order");
    
    const query = queryEl ? queryEl.value : "";
    const role = roleEl ? roleEl.value : "all";
    const order = orderEl ? orderEl.value : "asc";
    
    populateRoleOptions("#role-filter", "Tất cả chức vụ");
    const visible = filteredMembers(query, role, order);

    grid.innerHTML = visible.map((person, index) => `
      <div class="col-sm-6 col-lg-4">
        <article class="the-thanh-vien">
          <div class="anh-thanh-vien">${String(index + 1).padStart(2, "0")}</div>
          <h3 class="mb-2" style="font-size: 1.1rem; font-weight: 800;">${escapeHtml(person.name)}</h3>
          <span class="nhan-chuc-vu">${escapeHtml(person.role)}</span>
        </article>
      </div>
    `).join("");

    const countEl = document.querySelector("#member-count");
    if (countEl) countEl.textContent = `Đang hiển thị ${visible.length} / ${members.length} thành viên`;
    
    const emptyEl = document.querySelector("#empty-state");
    if (emptyEl) emptyEl.classList.toggle("d-none", visible.length !== 0);
  }

  // Bắt sự kiện trang Thành viên
  if (document.querySelector("#member-grid")) {
    const searchInput = document.querySelector("#member-search");
    const clearInputBtn = document.querySelector("#btn-clear-input");

    const updateSearch = () => {
      renderMemberCards();
      if (clearInputBtn && searchInput) {
        clearInputBtn.classList.toggle("d-none", searchInput.value.trim() === "");
      }
    };

    renderMemberCards();

    if (searchInput) {
      if (window.jQuery) $("#member-search").on("input search", updateSearch);
      else {
        searchInput.addEventListener("input", updateSearch);
        searchInput.addEventListener("search", updateSearch);
      }
    }

    if (clearInputBtn && searchInput) {
      clearInputBtn.addEventListener("click", () => {
        searchInput.value = "";
        updateSearch();
        searchInput.focus();
      });
    }

    ["#role-filter", "#sort-order"].forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.addEventListener("change", renderMemberCards);
    });

    const clearSearchBtn = document.querySelector("#clear-search");
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        const roleFilter = document.querySelector("#role-filter");
        const sortOrder = document.querySelector("#sort-order");
        if (roleFilter) roleFilter.value = "all";
        if (sortOrder) sortOrder.value = "asc";
        updateSearch();
        if (searchInput) searchInput.focus();
      });
    }

    // Phím tắt Ctrl + K để tìm kiếm
    document.addEventListener("keydown", event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (searchInput) {
          event.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  // Xử lý Form góp ý trên trang Liên hệ
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.querySelector("#contact-name");
      const email = document.querySelector("#contact-email");
      const topic = document.querySelector("#contact-topic");
      const message = document.querySelector("#contact-message");
      const consent = document.querySelector("#privacy-check");

      if (name) name.setCustomValidity(name.value.trim().length >= 2 ? "" : "Tên cần có ít nhất 2 ký tự.");
      if (message) message.setCustomValidity(message.value.trim().length >= 10 ? "" : "Nội dung cần có ít nhất 10 ký tự.");

      [name, email, topic, message, consent].forEach(field => {
        if (field) field.classList.toggle("is-invalid", !field.checkValidity());
      });

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      const status = document.querySelector("#contact-message-status");
      setNotice(status, `Cảm ơn ${name.value.trim()}! Biểu mẫu đã được kiểm tra. Đây là bản demo nên thông tin không được gửi hay lưu lại.`, "success");
      contactForm.reset();
      contactForm.classList.remove("was-validated");
      [name, email, topic, message, consent].forEach(field => {
        if (field) field.classList.remove("is-invalid");
      });
    });

    contactForm.querySelectorAll("input,select,textarea").forEach(field => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
    });
  }
})();