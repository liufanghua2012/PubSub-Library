var PS = {
	 
	/* topicList is an object containing topics. 
	 * Each topic is an associative array, where the key is the subscription name and the value is the function
	 */
	topicList: {},
	
	subscribe: function (topic, subName, cb) {
		if (typeof topic !== 'string' && typeof subName !== 'string' && typeof cb !== 'function'){
			throw new Error('Arguments of the wrong type.');
		}
		
		//if the topic doesn't exist, create the topic
		if ( !(this.topicList[topic]) ) {
			this.topicList[topic] = [];
		}

		//add the cb function to the topic under the key subName
		//if the subscription name already exists, the new function will override the old one
		this.topicList[topic][subName] = cb;
	},
	
	unsubscribe: function (topic, subName) {
		if(typeof topic !== 'string' && typeof subName !== 'string') {
			throw new Error('Arguments of the wrong type.')
		}	
		delete this.topicList[topic][subName];
	},
	
	publish: function (topic) {
		var arg = [];
		
		if (typeof topic !== 'string'){
			throw new Error('Topic must be a string');
		}
		
		//check if the topic exists. a topic exists if there are any subscriptions to it
		//if it doesnt exist, dont allow the user to publish this topic
		if (this.topicList[topic] === undefined) {
			throw new Error('No subscriptions to topic: '+topic);
		}
		
		//any arguments passed to the subscribed fn's will need to be an array
		if ( (arguments[1] !== undefined) && (arguments[1] instanceof Array) ) {
			arg = arguments[1];
		}
		
		/*
		 * iterate over the subscriptions for this topic and invoke each cb function
		 * passing it any arguments from the arguments array at position 1
		 */
		for(var key in this.topicList[topic]) {
			if(this.topicList.hasOwnProperty(topic)) {
				this.topicList[topic][key](arg);
			}
		}
	}
};
