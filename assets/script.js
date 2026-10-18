(() => {
  "use strict";
  const rosterMembers = (window.CLASS_ROSTER || []).map(person => ({ ...person }));
  let members = rosterMembers.map(person => ({ ...person }));
  const escapeHtml = value =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  const setNotice = (element, message, type) => {
    if (!element) return;
    element.className = `alert alert-${type}`;
    element.style.padding = "0.75rem 1rem";
    element.style.marginTop = "1rem";
    element.style.borderRadius = "8px";
    element.style.fontWeight = "600";

    if (type === "success") {
      element.style.backgroundColor = "#d1e7dd";
      element.style.color = "#0f5132";
      element.style.border = "1px solid #badbcc";
    } else if (type === "warning") {
      element.style.backgroundColor = "#fff3cd";
      element.style.color = "#664d03";
      element.style.border = "1px solid #ffecb5";
    } else {
      element.style.backgroundColor = "#f8d7da";
      element.style.color = "#842029";
      element.style.border = "1px solid #f5c2c7";
    }
    element.textContent = message;
  };

  function removeVietnameseTones(str) {
    return String(str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  function filteredMembers(query, role, order) {
    const normalized = removeVietnameseTones(query.trim().toLocaleLowerCase("vi"));
    return members.filter(person => {
      const targetText = removeVietnameseTones(`${person.name} ${person.role}`.toLocaleLowerCase("vi"));
      const matchesText = targetText.includes(normalized);
      const matchesRole = (role === "tat-ca" || person.role === role || person.role.includes(role));
      return matchesText && matchesRole;
    }).sort((a, b) => {
      const givenName = name => name.trim().split(/\s+/).pop();
      const byGivenName = givenName(a.name).localeCompare(givenName(b.name), "vi", { sensitivity: "base" });
      const sortResult = byGivenName || a.name.localeCompare(b.name, "vi", { sensitivity: "base" });
      return order === "giam-dan" ? -sortResult : sortResult;
    });
  }

  function populateRoleOptions() {
    const select = document.querySelector("#loc-chuc-vu");
    if (!select) return;
    const previous = select.value;
    const roles = [...new Set(members.map(person => person.role))].sort((a, b) => a.localeCompare(b, "vi"));
    select.innerHTML = `<option value="tat-ca">Tất cả chức vụ</option>` +
      roles.map(role => `<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`).join("");
    select.value = roles.includes(previous) ? previous : "tat-ca";
  }

  function renderMemberCards() {
    const grid = document.querySelector("#danh-sach-thanh-vien");
    if (!grid) return;

    const queryEl = document.querySelector("#tim-thanh-vien");
    const roleEl = document.querySelector("#loc-chuc-vu");
    const orderEl = document.querySelector("#sap-xep");

    const query = queryEl ? queryEl.value : "";
    const role = roleEl ? roleEl.value : "tat-ca";
    const order = orderEl ? orderEl.value : "tang-dan";

    const visible = filteredMembers(query, role, order);

    if (visible.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6b7280;">Không tìm thấy thành viên phù hợp.</div>`;
      return;
    }

    grid.innerHTML = visible.map((person, index) => `
      <article class="the-thanh-vien">
        <div style="font-size: 0.85rem; font-weight: 700; color: #a31318; margin-bottom: 0.3rem;">#${String(index + 1).padStart(2, "0")}</div>
        <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.3rem;">${escapeHtml(person.name)}</h3>
        <span style="display: inline-block; background: #f3f4f6; color: #111827; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px; border: 1px solid #e5e7eb;">${escapeHtml(person.role)}</span>
      </article>
    `).join("");
  }

  if (document.querySelector("#danh-sach-thanh-vien")) {
    populateRoleOptions();
    renderMemberCards();

    const searchInput = document.querySelector("#tim-thanh-vien");
    if (searchInput) {
      searchInput.addEventListener("input", renderMemberCards);
      searchInput.addEventListener("search", renderMemberCards);
    }

    ["#loc-chuc-vu", "#sap-xep"].forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.addEventListener("change", renderMemberCards);
    });

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

  const randomBtn = document.querySelector("#nut-boc-tham");
  const resultDiv = document.querySelector("#ket-qua-truc-nhat");

  if (randomBtn && resultDiv) {
    const groups = ["Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4", "Tổ 5", "Tổ 6"];

    randomBtn.addEventListener("click", () => {
      randomBtn.disabled = true;
      let counter = 0;

      const interval = setInterval(() => {
        const tempGroup = groups[Math.floor(Math.random() * groups.length)];
        resultDiv.textContent = `Đang bốc thăm...  ${tempGroup}`;
        counter++;

        if (counter > 15) {
          clearInterval(interval);
          const finalGroup = groups[Math.floor(Math.random() * groups.length)];

          const groupMembers = rosterMembers
            .filter(m => m.role.toLowerCase().includes(finalGroup.toLowerCase()))
            .map(m => m.name);

          const memberListHtml = groupMembers.length > 0
            ? `<br><small style="font-weight: normal; font-size: 0.95rem; color: #6b7280;">Thành viên gồm: ${groupMembers.join(", ")}</small>`
            : "";

          resultDiv.innerHTML = ` Chúc mừng <strong>${finalGroup}</strong> đã được chọn trực nhật hôm nay! ${memberListHtml}`;
          randomBtn.disabled = false;
        }
      }, 90);
    });
  }

  const contactForm = document.querySelector("#bieu-mau-lien-he");
  if (contactForm) {
    const nameInput = document.querySelector("#ho-ten");
    const emailInput = document.querySelector("#email-lien-he");
    const topicInput = document.querySelector("#chu-de");
    const messageInput = document.querySelector("#noi-dung-gop-y");
    const consentInput = document.querySelector("#xac-nhan-bao-mat");
    const statusDiv = document.querySelector("#trang-thai-gui");

    function setFieldStatus(input, isValid, msgElement) {
      if (!input) return;
      if (!isValid) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        if (msgElement) {
          msgElement.classList.add("text-danger", "fw-semibold");
          msgElement.classList.remove("text-muted");
        }
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        if (msgElement) {
          msgElement.classList.remove("text-danger", "fw-semibold");
          msgElement.classList.add("text-muted");
        }
      }
    }

    function validateContactForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const topicVal = topicInput ? topicInput.value : "";
      const messageVal = messageInput ? messageInput.value.trim() : "";
      const consentVal = consentInput ? consentInput.checked : false;

      const isNameValid = nameVal.length >= 2 && nameVal.length <= 60;
      const isEmailValid = emailVal === "" || emailRegex.test(emailVal);
      const isTopicValid = topicVal !== "";
      const isMessageValid = messageVal.length >= 10 && messageVal.length <= 800;
      const isConsentValid = consentVal;

      setFieldStatus(nameInput, isNameValid, document.querySelector("#ho-ten-msg"));
      setFieldStatus(emailInput, isEmailValid, document.querySelector("#email-msg"));
      setFieldStatus(topicInput, isTopicValid, document.querySelector("#chu-de-msg"));
      setFieldStatus(messageInput, isMessageValid, document.querySelector("#noi-dung-msg"));
      setFieldStatus(consentInput, isConsentValid, document.querySelector("#consent-msg"));

      return isNameValid && isEmailValid && isTopicValid && isMessageValid && isConsentValid;
    }

    [nameInput, emailInput, topicInput, messageInput, consentInput].forEach(inputEl => {
      if (inputEl) {
        inputEl.addEventListener("input", validateContactForm);
        inputEl.addEventListener("change", validateContactForm);
      }
    });

    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const isValid = validateContactForm();

      if (!isValid) {
        setNotice(statusDiv, "Vui lòng kiểm tra lại các ô bị báo đỏ bên trên!", "warning");
        return;
      }

      setNotice(statusDiv, `Cảm ơn ${nameInput.value.trim()}! Ý kiến đóng góp của bạn đã được gửi thành công.`, "success");
      contactForm.reset();

      [nameInput, emailInput, topicInput, messageInput, consentInput].forEach(el => {
        if (el) el.classList.remove("is-valid", "is-invalid");
      });
      document.querySelectorAll(".form-text").forEach(msg => {
        msg.classList.remove("text-danger", "fw-semibold");
        msg.classList.add("text-muted");
      });
    });
  }
})();
