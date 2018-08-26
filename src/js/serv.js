app.factory('$serv', function($http, $q) {
    // var url = 'http://calcapp-env.k9wwxmfb9q.ap-southeast-1.elasticbeanstalk.com/api/user';
    // var url = 'http://localhost:8081/api/user'
    var url = 'https://thomson-reuters-calcapp.herokuapp.com/api/user';
    var srvObj = {
        saveCloud: function(data) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: data
            }).then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        loadCloud: function(id) {
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: url,
                params: { id: id }
            }).then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        genGuid: function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    };
    return srvObj;
})