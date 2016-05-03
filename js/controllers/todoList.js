gitHubApp.controller('gitHubApp', ['$scope', '$http','$window','$timeout',
    function ($scope, $http,$window,$timeout) {

    		var container = document.querySelector(".cont");
    		
    		$scope.search = function(search){

    			$http.get("https://api.github.com/search/repositories?q=" + search +"&per_page=10")
		     
		      .success(function (data) {
		      		

		      		$scope.repoDetails = [];
				$scope.repos = data.items;
				$scope.count = data.total_count;
				$scope.count == 0 ? $scope.count = "No" : $scope.count;
				$timeout(function(){
					container.scrollTo(0, 0);
				},10);
					
     			 });
		};


		$scope.loadRepo = function(fullName){

				$http.get("https://api.github.com/repos/"+ fullName +"/commits?per_page=100")
				.success(function(data) {

					$scope.graph = 1;
					$scope.pie = 1;
					$scope.repoDetails = data;
					$scope.users = {};

					$scope.chartLabel = [];
					$scope.chartCount = [];

					$scope.lineLabel = [];
					$scope.dayLabel = [];
					$scope.commitDate = [];
					$scope.series = [];

					$scope.weekDay = [];
					$scope.month = [];
					$scope.lineDataComplete = [];
					$scope.lineData = new Array(12);
					$scope.lineData.fill(0);

					$scope.dayDataComplete = [];
					$scope.dayData = new Array(7);
					$scope.dayData.fill(0);



					for(users of $scope.repoDetails) {  // Commit count per user
						$scope.users[users.commit.author.name] = {
							"count" : 0, 
							"login" : users.author !== null ? users.author.login : users.commit.author.name
						 }
					}

					for(users of $scope.repoDetails) {
						$scope.users[users.commit.author.name].count++;
						$scope.commitDate.push(formatDate(users.commit.author.date));

					}

					$timeout(function(){
						for (user in $scope.users) { 	// Pie Chart Data
							$scope.chartLabel.push(user);
							$scope.chartCount.push($scope.users[user].count);
						}

					}, 0);


					for (date of $scope.commitDate) {  // Line Chart Data
						$scope.weekDay.push(date.day);
						$scope.month.push(date.month);
					}

					$timeout(function(){  
						
						$scope.lineLabel = ['January (2016)', 'February', 'March', 'April', 'May', 'June (2015)', 'July','August','September','October','November','December'];
						$scope.series = ['Commits'];
						$scope.month.forEach(countMonth);
						$scope.lineDataComplete.push($scope.lineData);
						
					}, 1200);

					$timeout(function(){
						$scope.dayLabel = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
						$scope.weekDay.forEach(countDay);
						$scope.dayDataComplete.push($scope.dayData);
					},2000);
					

				});

		}



		$scope.userDetails = function(userName) {

			$scope.get = false;
			$scope.pie = 2;
			$scope.commiter = {};

			$timeout(function(){
				$scope.pie = 3;
			},500);

			for (commits of $scope.repoDetails){
				if (commits.commit.author.name == userName[0].label && !$scope.get) {
					
					$scope.get = true;
					
					$http.get(commits.url)
						
						.success(function(data){

						$scope.commiter = data;
						$scope.commitDate = formatDate($scope.commiter.commit.author.date);

					});

				}
			}

		}



		function formatDate(date) {
			var NewDate = new Date(date);
			return {
				"day" : NewDate.getDay(),
				"month" : date.slice(5,7),
				"fulltime" : date.slice(11,19),
				"fulldate" : date.slice(0,10)
			};

		}

		function countMonth(month) {
			month = parseInt(month);
				$scope.lineData[month-1]++;
		}

		function countDay(day) {
			day = parseInt(day);
				$scope.dayData[day-1]++;
		}

		$scope.delayFade = function() {
			$scope.pie = 2;

			$timeout(function(){
				$scope.pie = 1;
			},500);
		}


	}
]);









