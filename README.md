Webmirror
=========

*   This is a web front end developing tool, it helps us develop the web page exactly same with design.              
*   This tool is developed based on jquery. and also include jquery mousewheel plugin and jquery cookie plugin inside. 
*   The principle of this tool is to put the design image on the top of our page, help us develop page as same as design with short time.
*   **It is supported in all browsers[Firefox, Chrome, Safari, Opera, IE6, IE7, IE8, IE9, IE10, IE11].**

### Demos:
1. http://webmirror.tracylv.com/demo/demo1.htm             
2. http://webmirror.tracylv.com/demo/demo2.htm          
screenshot:              
![webmirror screenshot][1]           

#### How To Deply It Into Your Page?
* *Firstly, include the webmirror.js at the bottom of your page.(no need download to local)*        
```
	<script type="text/javascript" src="http://webmirror.tracylv.com/webmirror.js" ></scirpt>
    </body>
</html>
```
if your page didn't include jquery, you also need include jquery in front of webmirror.js, see below:
```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="http://webmirror.tracylv.com/webmirror.js" ></script>
```      

* *Secondly, name your design image as "design.jpg" and put it in the same directory of your page.*     
  **Note:** you can also name the design image as other names and put in other directory, but you need to override the default design path parameter. we will talk about override parameters in following section(Override Default Parameters).

#### How To Use It?
1. **"Alt" key + mousewheel scrolldown:** increase the design layer opacity        
2. **"Alt" key + mousewheel scrollup:** decrease the design layer opacity       
3. **Drag design image or "Alt" key + Up/Right/Down/Left key:** move the design layer position       
4. **Double click the design layer:** close the design layer            
5. **Double click in your page:** open the design layer      

#### Default Parameters:
```
// default parameters
var webmirror_defaults = 
{
	// design default layer opacity
	opacity: 0.1,
	
	// design layer width
	width: "100%",
	
	// -1 or <=0 means keep the same height as body; while if height > 0, use the specified value
	height: -1,
	
	// design layer offset
	offset: { top: 0, left: 0},
	
	//design screenshot path
	imgpath : "design.jpg"
};
$.webmirror_options = {};
```
#### Override Default Parameters:
you can override one or more parameters with $.webmirror_options, like this:    
```
$.webmirror_options = {opacity: 0.2};

$.webmirror_options = {opacity: 0.3, width: 400, height: 400};

$.webmirror_options = {offset: {top: 100, left: 100}, imgpath: "designpath/xx/xxx.jpg"};
Note: for imgpath, please use relative path or absolute path start with "http://", don't use some like: "D://xx/x.jpg", "file:///xx/x.jpg"
```
For example:       
```
<script type="text/javascript" src="http://webmirror.tracylv.com/webmirror.js" ></script>
<script type="text/javascript">
	$.webmirror_options = {"imgpath" : "design/module_design.jpg", width: 374, height: 401};
</script>
```

#### Suggestions:
1. don't the disable the cookie. because we use cookie to remember the current setting for webmirror.
2. remove the webmirror.js from your page after you finished web frontend developing work. 
3. host the webmirror.js in your local environment.           

#### Known Issues:
1. in IE browsers, sometimes mousewheel scroll Up/Down couldn't scroll the page, only update the design layer opacity instead.     
*Solution: Press "Alt" Key again.*
2. when using it in Chrome browser with file path system, like "file:///C:/Users/tracy.lv/Desktop/demo1.htm", it can't remember the cookies(the current settings for webmirror).         
*Solution: if use it in Chrome, please use local IIS to develop, like "http://localhost/demo1.htm".*



[1]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/demo2screenshot.jpg
[2]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/defaultparameters.jpg
[3]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/overrideparameters.jpg
