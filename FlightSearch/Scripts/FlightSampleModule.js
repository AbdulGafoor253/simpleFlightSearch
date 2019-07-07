
    var app = angular.module('FlightSearch', ['angularjs-datetime-picker']);
    app.controller('SearchFlightController', function ($scope, $http) {
        debugger;

        $scope.IsDisFlightNumber = false;
        $scope.IsDisOrigin = false;
        $scope.IsDisDestination = false;

        $scope.success = false;
        $scope.errorshow = true;
        $scope.flights = [];


        $scope.DisableOrigandDest = function () {
            debugger;
           
            var flightnumber = $scope.SF.FlightNumber;
            if (flightnumber != undefined) {
                if (flightnumber.length > 0) {

                    $scope.IsDisOrigin = true;
                    $scope.IsDisDestination = true;
                }
                else {
                    $scope.errorshow = true;
                    $scope.IsDisOrigin = false;
                    $scope.IsDisDestination = false;

                }
            }
            else {
                $scope.errorshow = true;
                $scope.IsDisOrigin = false;
                $scope.IsDisDestination = false;

            }
        }


        $scope.DisableFlightNumber = function () {
            debugger;
            $scope.errorshow = true;
            var Origin = $scope.SF.Origin;
            var Destination = $scope.SF.Destination;
            if ((Origin != undefined) || (Destination != undefined)) {
                if ((Origin.length > 0) || (Destination.length > 0)) {

                    $scope.IsDisFlightNumber = true;

                }
                else {
                    $scope.IsDisFlightNumber = false;
                    $scope.errorshow = true;

                }
            }
            else {
                $scope.IsDisFlightNumber = false;
                $scope.errorshow = true;
            }

        }


        $scope.SearchFlights = function (SF) {
            debugger;
            var Flight = SF.FlightNumber;

            if (Flight != undefined) {
                if (Flight.length > 0) {
                    var routelink = 'http://localhost:8081/list?flightNumber=' + SF.FlightNumber + '&departure=' + SF.DepartureDate;
                }
                else {
                    var routelink = 'http://localhost:8081/list?origin=' + SF.Origin + '&destination=' + SF.Destination + '&departure=' + SF.DepartureDate;


                }
            }
            else {
                var routelink = 'http://localhost:8081/list?origin=' + SF.Origin + '&destination=' + SF.Destination + '&departure=' + SF.DepartureDate;
            }


            $http({
                url: routelink,
                method: 'get',
            }).then(function (response) {

                if (response.data.length > 0) {
                    $scope.success = true;
                    $scope.errorshow = false;
                    $scope.flights = response.data;
                }
                else {
                    alert('No Results Found');
                    $scope.success = false;
                    $scope.errorshow = true;
                }
            })
        }

    });
