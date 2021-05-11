# ApiDark
| By: Danslans |

Include library
```
<script src="https://danslans.github.io/ApiDark/js/scripts.js" ></script>
```
Example:

You can create a custom element adding properties on this variable "this.functs"
```
this.functs.example = [
	{
		element: {
			name: "div",
			style:"height:100px;width:100%;overflow: auto;"
		}
	}
];
```
Now write in your HTML file the new created element
```
<example> name </example>
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://danslans.github.io/ApiDark/js/scripts.js" ></script>
    <script>
            this.functs.example = [
                {
                    element: {
                        name: "div",
                        style: "height:100px;width:100%;overflow: auto; background-color:red"
                    }
                }
            ];
    </script>
</head>
<body>
    <example> name </example>
</body>
</html>
```

