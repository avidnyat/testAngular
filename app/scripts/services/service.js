'use strict';
/**
 * Created by avidnyat on 10/25/15.
 */


angular.module('angularSeedApp')
  .factory('services',function ( Restangular, $q ) {
    function getData(){
      var deferred = $q.defer();
      Restangular.all("/data/data.json").getList().then(function(resp){
        deferred.resolve(resp);
      },function(resp){
        deferred.reject(resp);
      });
      return deferred.promise
    }
    function getConfig(obj){
      var config = {
        "Pending":{
          "boxBorder": "grey-border",
          "icon": (obj.itemType === "build")? "/images/icon.gif":"/images/icon.gif",
          "metrics": "grey-box",
          "build": "grey-box",
          "unitTest": "grey-box",
          "functionalTest": "grey-box"


        },
        "Running":{
          "boxBorder": "blue-border",
          "icon": (obj.itemType === "firewall")? "/images/blue.gif":"/images/blue.gif",
          "metrics": (obj.Metrics.status == "Pending")?"grey-box":"blue-box",
          "build": (obj.Build.status == "Pending")?"grey-box":"blue-box",
          "unitTest": (obj.UnitTest.status == "Pending")?"grey-box":"blue-box",
          "functionalTest": (obj.FunctionalTest.status == "Pending")?"grey-box":"blue-box"

        },
        "Accepted":{
          "boxBorder": "green-border",
          "icon": (obj.itemType === "firewall")? "/images/green-brick.png":"/images/green_comp.gif",
          "metrics": "green-box",
          "build": "green-box",
          "unitTest": "green-box",
          "functionalTest": "green-box",
          "testTypeIcon": (obj.Metrics.testType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "testType": (obj.Metrics.testType === 0 )?"":"second-width-text-red",
          "maintainabilityTypeIcon": (obj.Metrics.maintainabilityType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "maintainabilityType": (obj.Metrics.maintainabilityType === 0 )?"":"second-width-text-red"

        },
        "Completed":{
          "boxBorder": "green-border",
          "icon": (obj.itemType === "firewall")? "/images/green-brick.png":"/images/green_comp.gif",
          "metrics": "green-box",
          "build": "green-box",
          "unitTest": "green-box",
          "functionalTest": "green-box",
          "testTypeIcon": (obj.Metrics.testType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "testType": (obj.Metrics.testType === 0 )?"":"second-width-text-red",
          "maintainabilityTypeIcon": (obj.Metrics.maintainabilityType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "maintainabilityType": (obj.Metrics.maintainabilityType === 0 )?"":"second-width-text-red"

        },
        "Rejected":{
          "boxBorder": "red-border",
          "icon": (obj.itemType === "firewall")? "/images/red_icon.gif":"/images/red_comp.png",
          "metrics": (obj.Metrics.status === "success")?"green-box":"red-box",
          "build": (obj.Build.status === "success")?"green-box":"red-box",
          "unitTest": (obj.UnitTest.status === "success")?"green-box":"red-box",
          "functionalTest": (obj.FunctionalTest.status === "success")?"green-box":"red-box",
          "metricsBox": (obj.Metrics.status === "success")?"":"red-big-box-border",
          "buildBox": (obj.Build.status === "success")?"":"red-big-box-border",
          "unitTestBox": (obj.UnitTest.status === "success")?"":"red-big-box-border",
          "functionalTestBox": (obj.FunctionalTest.status === "success")?"":"red-big-box-border",
          "testTypeIcon": (obj.Metrics.testType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "testType": (obj.Metrics.testType === 0 )?"":"second-width-text-red",
          "maintainabilityTypeIcon": (obj.Metrics.maintainabilityType === 0 )?"/images/green-arrow.png":"/images/red-down-arrow.png",
          "maintainabilityType": (obj.Metrics.maintainabilityType === 0 )?"":"second-width-text-red"

        }
      }
      return config[obj.status];
    }
    return{
      getData: getData,
      getConfig: getConfig
    }
  });
