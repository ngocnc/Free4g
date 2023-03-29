$(document).ready(function () {
  let homepages = ["/", "/index.html", "/index.php", "/Free4g/"];
  if (homepages.indexOf(window.location.pathname) >= 0) {
    const myModal = new bootstrap.Modal("#onload");
    myModal.show();
  }

  // Nav mobile click
  $(".hamburger-nav").on("click", function () {
    $(".page__sidebar").addClass("open__sidebar");
    if ($(".page__sidebar").hasClass("open__sidebar")) {
      $("body").append("<div class='drawer-overlay'></div>");
    }
    if ($(".drawer-overlay").length > 0) {
      $(".drawer-overlay").on("click", function () {
        $(this).remove();
        $(".page__sidebar").removeClass("open__sidebar");
      });
    }
    if ($(".page__sidebar").hasClass("show__icon--only")) {
      $(".page__sidebar").removeClass("show__icon--only");
      $(".page").attr("data-changing", false);
      $(".page__sidebar--logo > a").html("Speed4g Network");
    }
  });

  $(window).on("resize", function () {
    let windowsize = $(window).width();
    if (windowsize > 992) {
      $(".drawer-overlay").remove();
      if ($(".page__sidebar").hasClass("open__sidebar")) {
        $(".page__sidebar").removeClass("open__sidebar");
        $(".page__sidebar").removeClass("show__icon--only");
      }
    }
  });

  $(".hide-sidebar").on("click", function () {
    $(".page__sidebar").toggleClass("show__icon--only");
    let condition = $(".page__sidebar").hasClass("show__icon--only");

    // Change logo text
    if (condition) {
      $(".page__sidebar--logo > a").html("4g");
      $(".page").attr("data-changing", true);
    } else {
      $(".page__sidebar--logo > a").html("Speed4g Network");
      $(".page").attr("data-changing", false);
    }

    // Put menu title into sub menu
    // Each submenu and menu title has same index
    $(
      ".menu__column .menu__column--item.has-submenu > .menu__column--link > .menu__item--title"
    ).each(function (index, item) {
      let textHtml = `<li class="menu__column--item heading__submenu">
        <span>${$(this).text()}
        </span>
      </li>`;
      if (condition) {
        $(textHtml).prependTo(
          $(".menu__column .menu__column--item.has-submenu > .sub__menu")[index]
        );
      } else {
        $(".menu__column--item.heading__submenu").remove();
      }
    });
  });

  // Item has submenu in sidebar click
  $(
    ".menu__column .menu__column--item.has-submenu > .menu__column--link"
  ).click(function (e) {
    e.preventDefault();
    $(this)
      .next(".sub__menu")
      .slideToggle()
      .parent()
      .toggleClass("active")
      .siblings()
      .removeClass("active")
      .find(".sub__menu")
      .slideUp();
  });

  $(".notification__content p").each(function (index, item) {
    let text = $(item).text();
    let len = text.length;
    let limitedText = 200;

    if (len > limitedText) {
      $(item).text(
        $(item)
          .text()
          .substr(0, limitedText - 1) + "...  "
      );
    }
  });

  // Click outside to turn off which submenu open
  $(window).on("click", function (e) {
    if (
      $(e.target).closest(".page__sidebar .menu__column--link").length === 0 &&
      $(e.target).closest(".page-icon").length === 0 &&
      $(e.target).closest(".page__sidebar").length === 0 &&
      $(e.target).closest("[data-changing=false]").length === 0
    ) {
      $(".sub__menu").slideUp().parent().removeClass("active");
    }

    if (
      !$(e.target).is(".sub__menu--toggle.show *") &&
      !$(e.target).is(".toggle__menu i") &&
      !$(e.target).is(".changing-mode i")
    ) {
      $(".sub__menu--toggle").removeClass("show");
    }
  });

  // Change darkmode
  $(".changing-mode").on("click", function () {
    $("body").toggleClass("dark-mode");
    if ($("body").hasClass("dark-mode")) {
      $(".changing-mode").find("i").attr("class", "fal fa-moon");
      localStorage.setItem("dark-mode", true);
    } else {
      $(".changing-mode").find("i").attr("class", "fal fa-sun");
      localStorage.setItem("dark-mode", false);
    }
  });

  $(window).on("load", function () {
    if (localStorage.getItem("dark-mode") === "true") {
      $("body").addClass("dark-mode");
      $(".changing-mode").find("i").attr("class", "fal fa-moon");
    }
  });

  $(".icon-toggle").on("click", function () {
    $(".icon-toggle").parent().find(".sub__menu--toggle").removeClass("show");
    $(this).parent().find(".sub__menu--toggle").addClass("show");
  });

  $(".page-table").each(function (index, item) {
    $(item).DataTable({
      dom: "Bfrtip",
      sort: false,
      language: {
        sProcessing: "Đang tải dữ liệu...",
        sInfo: "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
        oPaginate: {
          sFirst: "Đầu",
          sPrevious: "Trước",
          sNext: "Sau",
          sLast: "Cuối",
        },
      },
    });
  });
  $("table.no-search").each(function (index, item) {
    $(item).DataTable({
      dom: "Bfrtip",
      sort: false,
      searching: false,
      paging: false,
      info: false,
      language: {
        sProcessing: "Đang tải dữ liệu...",
        sInfo: "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
        oPaginate: {
          sFirst: "Đầu",
          sPrevious: "Trước",
          sNext: "Sau",
          sLast: "Cuối",
        },
      },
    });
  });

  // Copy text
  if ($(".copy-button").length > 0) {
    $(".copy-button").click(function () {
      $(".copy-border").focus();
      $(".copy-border").select();
      document.execCommand("copy");
    });
  }
});
