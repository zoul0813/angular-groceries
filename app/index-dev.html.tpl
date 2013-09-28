<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />

  <link rel="stylesheet" href="css/topcoat-desktop-dark.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <link rel="stylesheet" href="css/topcoat-mobile-dark.css" type="text/css" media="screen" title="no title" charset="utf-8">

  <link href="css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <link href="css/print.css" media="print" rel="stylesheet" type="text/css" />
  <!--[if IE]>
    <link href="css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <![endif]-->

  <title>Groceries</title>
</head>
  <body class="dark">
    <div ng-view>
    </div>
    <script src="js/angular/angular.min.js"></script>
    <script src="js/angular/angular-mobile.js"></script>
    <script src="js/angular/angular-cookies.min.js"></script>
    <script src="js/angular-local-storage/angular-local-storage.js"></script>
    
    <% _.each(dev_scripts, function(script) { %>
      <!-- <%=JSON.stringify(script) %> -->
      <script type="text/javascript" src="<%=script.dest%>"></script>      
    <% }); %>
    <script type="text/javascript">
      pgApp.initialize();
    </script>
</body>
</html>
