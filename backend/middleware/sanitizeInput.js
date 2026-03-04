/**
 * Input Sanitization Middleware
 * Uses DOMPurify to prevent XSS attacks.
 * Place before your routes in app.js.
 */
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const sanitize = [
	(req, res, next) => {
		// Sanitize all string fields in req.body
		if (req.body && typeof req.body === 'object') {
			Object.keys(req.body).forEach(key => {
				if (typeof req.body[key] === 'string') {
					req.body[key] = DOMPurify.sanitize(req.body[key]);
				}
			});
		}
		next();
	}
];
