//Import bootstrap
import './../../back_end/meta.js';
import theme from './../theme.scss';

import $ from 'jquery';
import staticHtml from './loginContent.html';
import loginBackground from '../resources/sandt.png';
import credentials from './../../back_end/credentials.json';

$.getScript( "https://apis.google.com/js/platform.js", function( data, textStatus, jqxhr ) {
  console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Google API was performed" );
});

//Add div to put static HTML in
var injectDiv = document.createElement('div');
injectDiv.classList.add('container');
injectDiv.innerHTML = staticHtml;

document.body.appendChild(injectDiv);

//Set body background image
// document.body.style.backgroundImage = 'url(' + loginBackground + ')';
// console.log(loginBackground);

window.onSignIn = function(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);

	//Open student or instructor page from here, may make a call to canvas API to
	//determine whether it was an instructor or student

	//Additional question: what if they are both?
}