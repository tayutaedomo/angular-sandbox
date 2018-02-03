
(function(){

  angular.module('myApp.capture', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/capture', {
        templateUrl: 'capture/capture.html',
        controller: 'CaptureCtrl as captureCtrl'
      });
    }])

    .service('S3UploadService', S3UploadService)
    .controller('CaptureCtrl', CaptureCtrl);

  function CaptureCtrl(h2c, S3UploadService) {
    var that = this;
    var container = document.querySelector('#capture_container');

    this.capture = function() {
      h2c.renderBody().then(function(canvas) {
        canvas.style.width = '256px';
        canvas.style.height = '256px';

        container.appendChild(canvas);
      });
    };

    this.upload = function() {
      h2c.renderBody().then(function(canvas) {
        canvas.style.width = '256px';
        canvas.style.height = '256px';

        return canvas;

      }).then(function(canvas) {
        return S3UploadService.upload(canvas);

      }).then(function(data) {
        console.log(data);

      }).catch(function(err) {
        console.error(err);
      });
    };
  }
  CaptureCtrl.$inject = ['html2canvas-angular', 'S3UploadService'];


  // Refer: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
  var bucketName = 'angular-sandbox.tayutaedomo.net';
  var bucketRegion = 'us-east-1';
  var IdentityPoolId = 'us-east-1:ea2e6287-8017-4be7-a275-89e018233b3a';

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    })
  });

  function S3UploadService($q) {
    this.upload = function(canvas) {

      function createFileName() {
        var now = new Date();
        return 'screen_capture_' + now.getTime();
      }

      function createKey(fileName) {
        return 'capture/' + fileName;
      }

      var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
      });

      var deferred = $q.defer();

      var contentType = 'image/jpeg';
      var dataUrl = canvas.toDataURL(contentType);
      var blobData = dataURItoBlob(dataUrl);

      var fileName = createFileName();
      var key = createKey(fileName);

      var params = {
        Key: key,
        ContentType: contentType,
        Body: blobData,
      };

      s3.upload(params, function (err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);

      }).on('httpUploadProgress', function(evt) {
        console.log('Upload Progress:', evt.loaded, '/', evt.total);
      });

      return deferred.promise;
    };

    // Refer: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    function dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    }
  }
  S3UploadService.$inject = ['$q'];

})();

