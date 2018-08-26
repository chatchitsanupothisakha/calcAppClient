app.controller('mainCtrl', function($scope, $serv) {
    $scope.calcObj = {};
    $scope.isCloud = false;
    var calcAppLS = window.localStorage;
    var UID = calcAppLS.getItem('UID');
    if (UID === null) {
        UID = $serv.genGuid();
        calcAppLS.setItem('UID', UID);
    }
    $scope.calc = function(operator) {
        $scope.calcObj.operator = operator;
        if (operator === 1) {
            $scope.calcObj.result = $scope.calcObj.A + $scope.calcObj.B;
        } else if (operator === 2) {
            $scope.calcObj.result = $scope.calcObj.A - $scope.calcObj.B;
        } else if (operator === 3) {
            $scope.calcObj.result = $scope.calcObj.A * $scope.calcObj.B;
        } else if (operator === 4) {
            $scope.calcObj.result = $scope.calcObj.A / $scope.calcObj.B;
        } else {
            $scope.calcObj.result = Math.pow($scope.calcObj.A, $scope.calcObj.B);
        }
    }
    $scope.save = function() {
        if (!$scope.isCloud) {
            fs.writeFile('assets/save.json', angular.toJson($scope.calcObj), function(err) {
                alert("Local Saved!");
            });
        } else {
            $scope.calcObj._id = UID;
            $serv.saveCloud($scope.calcObj).then(function(res) {
                alert("Cloud Drive Saved! UID: " + $scope.calcObj._id);
            })
        }
    }
    $scope.load = function() {
        if (!$scope.isCloud) {
            fs.readFile('assets/save.json', function(err, file) {
                if (file === undefined) {
                    alert("No Local File!");
                } else {
                    $scope.calcObj = JSON.parse(file);
                    $scope.$apply();
                    alert("Load Local File!");
                }
            });
        } else {
            $serv.loadCloud(UID).then(function(res) {
                if (res.data.err) {
                    alert("No Cloud Drive File! UID: " + UID);
                } else {
                    $scope.calcObj = res.data;
                    alert("Load Cloud Drive File! UID: " + $scope.calcObj._id);
                }
            })
        }
    }
});