'use strict';

function NavbarDirective () {
  return {
    templateUrl: 'templates/navbar.html',
    replace: true,
    controller: 'navbarCtrl'
  }
}

module.exports = NavbarDirective;