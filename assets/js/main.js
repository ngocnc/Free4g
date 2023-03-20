$(document).ready(function () {
  const myModal = new bootstrap.Modal('#onload');
  if( window.location.pathname == '/index.html' || window.location.pathname == '/index.php' ){
    myModal.show();
  }
  // Nav mobile click
  $(".hamburger-nav").on("click",function(){
    $(".page__sidebar").addClass("open__sidebar");
    if($(".page__sidebar").hasClass("open__sidebar")){
      $("body").append("<div class='drawer-overlay'></div>");
    }
    if($('.drawer-overlay').length > 0){
      $('.drawer-overlay').on("click",function(){
        $(this).remove();
        $(".page__sidebar").removeClass("open__sidebar");
      })
    }
    if($(".page__sidebar").hasClass("show__icon--only")){
      $(".page__sidebar").removeClass("show__icon--only")
      $(".page").attr("data-changing", false);
      $(".page__sidebar--logo > a").html("Speed4g Network");
    }
  })

  $(window).on("resize", function () {
    let windowsize = $(window).width();
    if(windowsize > 992){
      $('.drawer-overlay').remove();
      if($(".page__sidebar").hasClass("open__sidebar")){
        $(".page__sidebar").removeClass("open__sidebar");
        $(".page__sidebar").removeClass("show__icon--only")
      }
    }
  });


  $(".hide-sidebar").on("click", function () {
    $(".page__sidebar").toggleClass("show__icon--only");
    let condition = $(".page__sidebar").hasClass("show__icon--only");

    // Change logo text
    if (condition) {
      $(".page__sidebar--logo > a").html("4g");
      $(".page").attr("data-changing", true)
    } else {
      $(".page__sidebar--logo > a").html("Speed4g Network");
      $(".page").attr("data-changing", false)
    }

    // Put menu title into sub menu
    // Each submenu and menu title has same index
    $(
      ".menu__column .menu__column--item.has-submenu > .menu__column--link > .menu__item--title"
    ).each(function (index, item) {
      let textHtml = `<li class="menu__column--item heading__submenu">
        <span>${$(
            this
          ).text()}
        </span>
      </li>`;
      if (condition) {
        $(textHtml).prependTo(
          $(".menu__column .menu__column--item.has-submenu > .sub__menu")[index]
        );
      } else {
        $(".menu__column--item.heading__submenu").remove();
      }
      let eachSubMenu = $(".sub__menu")[index];
      let eachTotalHeightOfSubMenu = 0;

      if ($(eachSubMenu).parent().hasClass("active")) {
        $(eachSubMenu)
          .children()
          .each(function () {
            eachTotalHeightOfSubMenu += $(eachSubMenu)
            .children().height();
          });
        $(eachSubMenu).height(eachTotalHeightOfSubMenu);
      }
    });
  });

  // Item has submenu in sidebar click
  $(".menu__column .menu__column--item.has-submenu > .menu__column--link").each(
    function (index, item) {
      $(item).attr("href", "javascript:void(0)");
      $(this).on("click", function () {
        let parentMenuLink = $(this).parent();
        let totalHeightOfChildren = 0;
        let subMenu = $(this).parent().find(".sub__menu");

        parentMenuLink.toggleClass("active");

        if (parentMenuLink.hasClass("active")) {
          subMenu.children().each(function () {
            totalHeightOfChildren += $(this).outerHeight(true);
          });
          subMenu.height(totalHeightOfChildren);
          $(this)
            .parent()
            .siblings(".menu__column--item.has-submenu")
            .removeClass("active")
            .find(".sub__menu")
            .height(0);
        } else {
          subMenu.height(0);
          $(this)
            .parent()
            .siblings(".menu__column--item.has-submenu")
            .removeClass("active");
        }
      });
    }
  );
  $(window).on("click",function(e){

    let activeSubmenu = $(".menu__column--item.has-submenu.active");
    let changeSidebar = $(".page-icon.hide-sidebar svg " || ".show__icon--only .page-icon.hide-sidebar svg")

    if(!activeSubmenu.is(e.target) && activeSubmenu.has(e.target).length === 0 && !changeSidebar.is(e.target)){
      $(activeSubmenu).removeClass("active")
      .find(".sub__menu")
      .height(0);
    }
  })
});
