var input = $('#timePicker');
    var input2 = $('.timePickerEdit');

    input.clockpicker({
        autoclose: true
    });

    input2.clockpicker({
        autoclose: true
    });

    $('[data-toggle="tooltip"]').tooltip();

    var app = angular.module("PatientApp", ['ngAnimate','ngToast']); // module init
    app.controller("PatientController", function($scope, $http, ngToast) { // controller init

        $scope.patients = [];
        $scope.patientsCount = 0;
        $scope.patientsMessage = "";
        $scope.viewer = {};

        $http.get("assets/js/patient-data.json").then(function(response) {
            $scope.patients = response.data;
            $scope.patientsCount = $scope.patients.length;
            console.log(response.data);


            $scope.checkPatientCount();

        }, function(response) {
            alert('Could Not Fetch Data.');
        });

        $scope.removePatient = function (id, person) {

            $scope.patients.splice(id, 1);

            ngToast.create({
                className: 'danger',
                content: '<i class="fi-check"> Removed ' + person.first + ' ' + person.last + "."
            });

            --$scope.patientsCount;
            $scope.checkPatientCount();

        };

        $scope.checkPatientCount = function () {

            if ($scope.patientsCount == 0) {
                $scope.patientsMessage = "No Patients scheduled today.";
            } else if ($scope.patientsCount == 1) {
                $scope.patientsMessage = $scope.patientsCount + " Patient scheduled today.";
            } else if ($scope.patientsCount > 1) {
                $scope.patientsMessage = $scope.patientsCount + " Patients scheduled today.";
            }
        };

        $scope.savePatient = function (patient) {
            console.log(patient);

            var temp = {
                "id": 139280,
                "first": patient.first,
                "last": patient.last,
                "phone": "(01914) 549991",
                "email": patient.email,
                "address": "Ap #103-226 Enim Ave",
                "city": "Poederlee",
                "zip": "54-573",
                "note": patient.note,
                "time": patient.time + " PM",
                "editing": "false"
            }

            $scope.patients.push(temp);

            $('#new').modal('toggle');

            ngToast.create({
                className: 'success',
                content: '<i class="fi-check">' + patient.first + ' has been added to the schedule.'
            });

            $scope.saveP = {};
        };

        $scope.viewPatient = function (id, patient) {

            $scope.viewer.id = patient.id;

            $scope.viewer.firstName = patient.first;
            $scope.viewer.lastName = patient.last;

            $scope.viewer.email = patient.email;
            $scope.viewer.time = patient.time;

            $scope.viewer.note = patient.note;
            $scope.viewer.address = patient.address;

            $scope.viewer.zip = patient.zip;
            $scope.viewer.city = patient.city;

            $scope.viewer.phone = patient.phone;

            console.log("g");

        };

        $scope.editPatient = function (patient) {
            patient.editing = "true";
        };

        $scope.doneEditing = function (patient, value) {

            if (value != "") {
                patient.editing = "false";

                ngToast.create({
                    className: 'success',
                    content: '<i class="fi-check">' + patient.first + '\'s appointment has been updated.'
                });
            }
        };

    });