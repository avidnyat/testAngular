'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('MainCtrl', function (services, $scope,  $timeout) {
    $scope.dataList = []
    $scope.getConfig = function(obj){
      return services.getConfig(obj);
    }
    var allowedStatus = ["Accepted","Rejected","Completed"]
    services.getData().then(function(resp){
      $scope.dataList = resp[0].data;
      $timeout(function(){
        for(var key in $scope.dataList){
          if(allowedStatus.indexOf($scope.dataList[key].status)!= -1){
            var data = google.visualization.arrayToDataTable([
              ['Issues', 'Status'],
              ['Passed',     $scope.dataList[key].UnitTest.passed],
              ['Failed',      $scope.dataList[key].UnitTest.failed]

            ]);
            console.log(data);
            var options = {
              backgroundColor: "none",
              legend: {position: 'none'},
              pieSliceText: 'value',
              pieSliceTextStyle: {color: "black", fontSize: '11'},
              slices: {
                0: {color: '#72AC4D'},
                1: {color: '#EB7D3B'}
              },
              height: 150,
              width: 150,
              pieStartAngle: 145
            };

              console.log($('#piechart_'+$scope.dataList[key].uniqueId).length);
              var chart = new google.visualization.PieChart(document.getElementById('piechart_'+$scope.dataList[key].uniqueId));
              chart.draw(data, options);
            var data = google.visualization.arrayToDataTable([
              ['Issues', 'Status'],
              ['Passed',     $scope.dataList[key].FunctionalTest.passed],
              ['Failed',      $scope.dataList[key].FunctionalTest.failed]

            ]);
            console.log(data);
            var options = {
              backgroundColor: "none",
              legend: {position: 'none'},
              pieSliceText: 'value',
              pieSliceTextStyle: {color: "black", fontSize: '11'},
              slices: {
                0: {color: '#72AC4D'},
                1: {color: '#EB7D3B'}
              },
              height: 150,
              width: 150,
              pieStartAngle: 145
            };

            console.log($('#piechart_'+$scope.dataList[key].uniqueId).length);
            var chart = new google.visualization.PieChart(document.getElementById('piechart1_'+$scope.dataList[key].uniqueId));
            chart.draw(data, options);


          }
        }

      },3000)
            console.log($scope.dataList);
    });




    $(document).on("click",".mouse-pointer", function(){
      $('.second-div').slideUp(1500);
      $('.second-div:not(.check-div)').addClass("check-div");
      $('.mouse-pointer').find(".status-box").show();
      if($(this).next().hasClass("check-div")){
        $(this).find(".status-box").hide();
        $(this).next().slideDown(1500);
        $(this).next().removeClass("check-div");
      }else{
        $(this).next().slideUp(1500);
        $(this).next().addClass("check-div");
        $(this).find(".status-box").show();
      }

    })

  });
