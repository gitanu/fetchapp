var addressGeowin = Ti.UI.currentWindow;

addressGeowin.backgroundColor = '#FFFFFF';

var Cloud = require('ti.cloud');
Cloud.debug = false;

addressGeowin.title = 'Contact Info';

var addressbgview = Ti.UI.createView({
	top : 10,
	left : 5,
	right : 5,
	bottom : 20,
	height : 'auto',
	layout : 'vertical',
	width : 'auto',
	backgroundColor : '#FFFFFF'
});

addressGeowin.add(addressbgview);

var fnamelbl = Ti.UI.createLabel({
	left : '5%',
	//top : 15,
	height : 'auto',
	text : 'First Name*',
	color : '#000000'
});
addressbgview.add(fnamelbl);

var fnametxt = Ti.UI.createTextField({
	hintText : 'First Name',
	color : '#000000',
	//top:35,
	height : 'auto',
	width : '90%',
	borderColor : '#000000',
});
addressbgview.add(fnametxt);

var lnamelbl = Ti.UI.createLabel({
	left : '5%',
	//top : 80,
	height : 'auto',
	text : 'Last Name*',
	color : '#000000'
});
addressbgview.add(lnamelbl);

var lnametxt = Ti.UI.createTextField({
	hintText : 'Last Name',
	color : '#000000',
	//top:100,
	height : 'auto',
	width : '90%',
	borderColor : '#000000',
});
addressbgview.add(lnametxt);

var emaillbl = Ti.UI.createLabel({
	left : '5%',
	//top : 145,
	height : 'auto',
	text : 'E-mail*',
	color : '#000000'
});
addressbgview.add(emaillbl);

var emailtxt = Ti.UI.createTextField({
	hintText : 'E-mail',
	color : '#000000',
	//top:165,
	height : 'auto',
	width : '90%',
	borderColor : '#000000',
});
addressbgview.add(emailtxt);


var update_Button = Ti.UI.createButton({
	//top : 535,
	top : 5,
	align : 'center',
	right : '5%',
	borderRadius : 3,
	width : '40%',
	//backgroundColor:'#FF0000',
	//height : '5%',
	title : 'Update'
});
addressbgview.add(update_Button);


//callback function
updateContactDatabase = function(cloudUserID) {
	//---------------------------------------------- check for the new user and  register to cloud.
	// Register to cloud using emailID.
	Ti.API.info( cloudUserID  );
	
	if ( cloudUserID === 0 || cloudUserID == 'Contacts Updated Successfully') {

		Cloud.Users.logout(function() {
			var email = emailtxt.value.split('@');
			email = email[0];

			// Added this because we removed email length.
			//password needs 4 characters

			if (email.length < 5) {
				email = email + 'weebeekon';
				// this is for password
			}

			
			/// register to appcelerator cloud services-----------------------------
			Cloud.Users.create({
				username : emailtxt.value,
				password : email,
				password_confirmation : email,
				first_name : fnametxt.value,
				last_name : lnametxt.value
			}, function(e) {
				if (e.success) {
					var logedinuser = e.users[0];
					Ti.App.Properties.setString('ACSUSERID', logedinuser.id);
					Ti.App.Properties.setString('CHKCLOUDID', logedinuser.id);
					Ti.App.Properties.setString('EmailUName', emailtxt.value);
					Ti.App.Properties.setString('EmailPass', email);
					updateACSAID(logedinuser.id);
					Ti.API.info('Created! You are now logged in as ' + logedinuser.id);
					//hideActivity();
					addressGeowin.registered = 1;
					// set the registered value
					addressGeowin.close();
					// close the current window
				} else {

					update_Button.enabled = true;
					addressGeowin.registered = 0;
					alert(e.message);
				}
			});
		});

	} else if ( cloudUserID === 1 ) {
		var email = emailtxt.value.split('@');
		email = email[0];
		Ti.App.Properties.setString('EmailUName', emailtxt.value);
		Ti.App.Properties.setString('EmailPass', email);
		hideActivity();
		addressGeowin.registered = 1;
		// set the registered value
		addressGeowin.close();
		// close the current window
	}

	//----------------------------------------------

	//addressGeowin.registered = 0 ; // set this when user is not ready to enter the contact info.
	// set this when user is ready to enter the contact info.

}; button
addressGeowin.addEventListener('android:back', function() {
Ti.UI.currentWindow.close();
});
