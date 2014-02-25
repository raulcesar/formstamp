angular.module('formstamp', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/calendar.html',
    "<div class=\"fs-calendar\" data-ng-switch=\"selectionMode\">\n" +
    "  <div data-ng-switch-when=\"year\">\n" +
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevYearRange()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{years[0]}}-{{years[years.length-1]}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextYearRange()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"yearGroup in yearGroups\">\n" +
    "        <td data-ng-repeat=\"year in yearGroup\"\n" +
    "            data-ng-click=\"selectYear(year)\"\n" +
    "            data-ng-class=\"{'active': year == selectedYear}\"\n" +
    "            class=\"year\">\n" +
    "          {{year}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-when=\"month\">\n" +
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevYear()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextYear()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"monthGroup in monthGroups\">\n" +
    "        <td data-ng-repeat=\"month in monthGroup\"\n" +
    "            data-ng-click=\"selectMonth(month)\"\n" +
    "            data-ng-class=\"{'active': month == selectedMonth && isSameYear()}\"\n" +
    "            class=\"month\">\n" +
    "          {{month}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-default>\n" +
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevMonth()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedMonth + ', ' + selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextMonth()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th data-ng-repeat=\"weekDay in weekDays\">\n" +
    "          {{weekDay}}\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr data-ng-repeat=\"week in weeks\">\n" +
    "        <td data-ng-repeat=\"day in week\" class=\"day\"\n" +
    "            data-ng-class=\"{'day-in-selected-month': isDayInSelectedMonth(day),\n" +
    "                       'day-current': isCurrentDate(day),\n" +
    "                       'active': isSelectedDate(day)}\"\n" +
    "            data-ng-click=\"selectDay(day)\">\n" +
    "          {{day.getDate()}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/datepicker.html',
    "<div class=\"fs-datepicker\">\n" +
    "  <input type=\"text\"\n" +
    "    class=\"form-control\"\n" +
    "    ng-focus=\"active=true\"\n" +
    "    data-ng-model=\"date\"\n" +
    "    ng-change=\"dateSelection()\"\n" +
    "    data-date-format=\"shortDate\">\n" +
    "  <div ng-if=\"active\" class=\"open\">\n" +
    "    <div class=\"dropdown-menu\">\n" +
    "      <fs-calendar ng-model=\"date\"\n" +
    "        ng-change=\"console.log('here');active=false;\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/field.html',
    "<div class='form-group'\n" +
    "  ng-class='{\"has-error\": validationErrors.length > 0}'>\n" +
    "  <label for='{{field}}' class='col-sm-2 control-label'>{{label}}</label>\n" +
    "  <div class='col-sm-10'>\n" +
    "    <div class='fs-field-input'\n" +
    "         items='items'\n" +
    "         invalid='validationErrors.length > 0'\n" +
    "         ng-model='object[field]'></div>\n" +
    "    <div>\n" +
    "    <p class='text-danger' ng-repeat='message in validationErrors'>\n" +
    "      <span>{{message}}</span>\n" +
    "    </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/templates/list.html',
    "<div class=\"dropdown open\">\n" +
    "  <ul class=\"dropdown-menu fs-multiselect-items-list-default fs-multiselect-items-list\"\n" +
    "      role=\"menu\" >\n" +
    "    <li ng-repeat=\"item in items\"\n" +
    "        ng-class=\"{true: 'active'}[$index == highlightIndex]\">\n" +
    "      <a ng-click=\"highlightItem(item)\"\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         tabindex='-1'>\n" +
    "         <span ng-transclude></span>\n" +
    "       </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/multiselect.html',
    "<div class='fs-multiselect fs-widget-root'>\n" +
    "  <div class=\"fs-multi-options\" ng-if=\"selectedItems.length > 0\">\n" +
    "    <a ng-repeat='selectedItem in selectedItems' class=\"btn\" ng-click=\"unselectItem(selectedItem)\">\n" +
    "      {{ getItemLabel(selectedItem) }}\n" +
    "      <span class=\"glyphicon glyphicon-remove\" ></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <input ng-keydown=\"onkeys($event)\"\n" +
    "         fs-input\n" +
    "         fs-hold-focus\n" +
    "         fs-on-focus=\"active = true\"\n" +
    "         fs-on-blur=\"active = false\"\n" +
    "         fs-down='move(1)'\n" +
    "         fs-up='move(-1)'\n" +
    "         fs-pgup='onPgup($event)'\n" +
    "         fs-pgdown='onPgdown($event)'\n" +
    "         fs-enter='onEnter($event)'\n" +
    "         class=\"form-control\"\n" +
    "         type=\"text\"\n" +
    "         placeholder='Select something'\n" +
    "         ng-model=\"search\" />\n" +
    "\n" +
    "  <div ng-if=\"active && (filteredItems = dropdownItems()).length > 0\" class=\"open\">\n" +
    "    <ul class=\"dropdown-menu fs-multiselect-items-list-default fs-multiselect-items-list\"\n" +
    "        role=\"menu\" >\n" +
    "      <li ng-repeat=\"item in filteredItems\"\n" +
    "          ng-class=\"{true: 'active'}[$index == highlightIndex]\">\n" +
    "        <a ng-click=\"selectItem(item)\"\n" +
    "           href=\"javascript:void(0)\"\n" +
    "           tabindex='-1'>{{ getItemLabel(item) }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/submit_field.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-transclude></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
