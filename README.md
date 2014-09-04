Webmirror
=========

*   This is a web front end developing tool, it helps us develop the web page exactly same with design.              
*   This tool is developed based on jquery. and also include jquery mousewheel plugin and jquery cookie plugin inside. 
*   The principle of this tool is to put the design image on the top of our page, help us develop page as same as design with short time.
*   **It is supported in all browsers[Firefox, Chrome, Safari, Opera, IE6, IE7, IE8, IE9, IE10, IE11].**

### Demo Screenshot:
![webmirror screenshot][1]
#### How To Deploy It Into Your Page?
* *Firstly, include the webmirror.js at the bottom of your page.* 
![webmirror screenshot][2]   
if your page didn't include jquery, you also need include jquery in front of webmirror.js, see below:
```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="../webmirror.js" ></script>
```      

* *Secondly, name your design image as "design.jpg" and put it in the same directory of your page.*     
  **Note:** you can also name the design image as other names and put in other directory, but you need to override the default design path parameter. we will talk about override parameters in following section(Override Default Parameters).

#### How To Use It?
1. **"Alt" key + mousewheel scrolldown:** increase the design layer opacity        
2. **"Alt" key + mousewheel scrollup:** decrease the design layer opacity       
3. **"Alt" key + Up/Right/Down/Left key:** move the design layer position       
4. **double click the design layer:** close the design layer            
5. **double click in your page:** open the design layer      

#### Default Parameters:
```
// default parameters
var webmirror_defaults = 
{
	// design default layer opacity
	opacity: 0.5,
	
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
![webmirror screenshot][3] 



#### Suggestions:
1. remove the webmirror.js from your page after you finished web frontend developing work.

#### Known Issues:
1. in IE browsers, sometimes mousewheel scroll Up/Down couldn't scroll the page, only update the design layer opacity.  
*Solution: Press "Alt" Key again.*


















[1]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/demo2screenshot.jpg
[2]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/defaultparameters.jpg
[3]:https://github.com/tracylv/webmirror/blob/master/demo/demo_screenshot/overrideparameters.jpg
