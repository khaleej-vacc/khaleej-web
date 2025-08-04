import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { transporter } from '$lib/server/mailer';

const limiter = new RateLimiter({ IPUA: [1, 'm'] });

const contactFormSchema = z.object({
	name: z.string().min(1, 'Required.'),
	vatsimCid: z.string().min(1, 'Required.').max(7, 'CID must be less than 7 characters.'),
	email: z.string().email(),
	message: z.string().min(8)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(contactFormSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(contactFormSchema));

		if (!form.valid) return fail(400, { form });

		if (await limiter.isLimited(event)) return message(form, { status: 'error', text: 'Too many requests! Try again after a few minutes.' });

		try {
			const time = new Date();

			const html = `
		    <!doctype html>
		    <html lang="en">
		        <head>
		            <meta charset="UTF-8" />
		            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		            <title>Contact Form Submission</title>
		        </head>
		        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px">
		            <div style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
		                <h2 style="color: #333">Contact Form Submission</h2>

		                <p style="color: #555"><strong>Name:</strong> ${form.data.name}</p>
		                <p style="color: #555"><strong>VATSIM CID:</strong> ${form.data.vatsimCid}</p>
		                <p style="color: #555"><strong>Email:</strong> ${form.data.email}</p>
		                <p style="color: #555"><strong>Message:</strong></p>
		                <p style="color: #555">${form.data.message}</p>

		                <div style="margin-top: 20px; font-size: 12px; color: #aaa">
		                    <p>Submitted on ${time.toLocaleString()} | IP: ${event.getClientAddress()}</p>
		                </div>
		            </div>
		        </body>
		    </html>
		    `;

			await transporter.sendMail({
				from: 'noreply@khaleejvacc.net',
				to: 'support@khaleejvacc.net',
				subject: 'Contact Form Submission',
				html
			});

			return message(form, { status: 'success', text: 'Your message has been sent successfully.' });
		} catch (err) {
            console.error(`[${event.url.pathname}] Error Sending Contact Form:`);
			console.error(err);
			// More advanced error handling can be added here in the future
			return message(form, { status: 'error', text: 'Uh oh! An error occured, try again later.' });
		}
	}
};
