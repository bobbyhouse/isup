#IsUp?

A Javascript Module that will poll the specified HTTP server on a given
interval. It will set a colored circle depending on the response code.

```
<!DOCTYPE html>
<html>
    <head>
        <title>Server Status</title>
        <link rel="stylesheet" type="text/css" href="./isup.css">
    </head>
    <body>
        <div id="node" class="is"></div>
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./isup.js"></script>
        <script type="text/javascript">
          up('http://localhost:3000').poll($('#node'));
        </script>
    </body>
</html>
```
