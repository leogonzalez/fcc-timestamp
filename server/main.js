import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

function convertDate(str) {
  var newstr = str;
  if (newstr.split('%20').length ===1) {
    const date = moment.unix(Number(str));
    const resTime = JSON.stringify({"unix": date.format('X'),
      "natural": date.format('MMM Do YYYY')
    });
    return resTime;
  } else {

    const date = moment(str.replace(/%20/gi,' '));
    const resTime = JSON.stringify({"unix": date.format('X'),
      "natural": date.format('MMM Do YYYY')
    });
    return resTime;
  }

}

Meteor.startup(() => {

  WebApp.connectHandlers.use((req,res,next) => {

    if (req.url.slice(1)) {
      const urlReq = convertDate(req.url.slice(1));
      res.end(urlReq);
    } else {
      next();
    }

  });

});
