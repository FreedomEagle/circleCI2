import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Accounts } from 'meteor/accounts-base';
import { DDPRateLimiter }   from 'meteor/ddp-rate-limiter';
import './task.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

 
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // print(Meteor.user(Meteor.user().username).username)
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log(  (Meteor.user().username) == 'babo'  )
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  
});

//Check to see if the super user logs in
Tracker.autorun(function(){
  if (Meteor.user()){
    if((Meteor.user().username == 'superUser')){
      Meteor.call('removeDDP')
      console.log("called!")
  }  
    else{
      console.log('reset')
      Meteor.call('resetDDP',)
    }
} 

})