angular
.module('formstamp')
.directive('fsDate', ->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
    placeholder: '@'
  templateUrl: '/templates/date.html'
  replace: true
  controller: ($scope, $filter) ->
    $scope.$watch 'selectedDate.date', (oldDate, newDate) ->
      updatedDate = updateDate(newDate, oldDate)
      $scope.active = false unless angular.equals(updatedDate, oldDate)
      $scope.formattedDate = $filter('date')(updatedDate, 'shortDate')

  link: ($scope, element, attrs, ngModel) ->
    parseDate = (dateString)->
      time = Date.parse(dateString)
      unless isNaN(time)
        parsedDate = new Date(time)
        new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      oldDate = ngModel.$modelValue
      updatedDate = updateDate(newDate, oldDate)

      if updatedDate?.getTime() != oldDate?.getTime()
        ngModel.$setViewValue(updatedDate)
)
