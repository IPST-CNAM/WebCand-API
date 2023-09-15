import express, { Request } from "express";

/* check if req object has each "elements" property from the list and return false if not, also set the req error messsage */
exports.checkIfQueryExist = function(req: Request, elements : string[]) {
	for (let i in elements) {
		console.log(req.params);
		console.log(req)
		if (!req.query.hasOwnProperty(elements[i])) {
			var errormsg = "Error ! : " + elements[i] + " is empty.";
			console.log(errormsg);
			return false;
		}
	}

	return true
}

export default exports; 
