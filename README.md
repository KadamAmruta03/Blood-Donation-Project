**# Blood-Donation-Project**# 🩸 Blood Donation Campaign - Web Application

**[Live Blood Donation Website](https://your-vercel-link.vercel.app/) | [Blood Donation GitHub](https://github.com/your-username/blood-donation)**

**Blood Donation Campaign** is a comprehensive, responsive web application designed to digitize the blood donation process in Mumbai. This project serves as a vital bridge between selfless donors and major medical institutions, allowing users to register for donations, track upcoming camps, and learn about the impact of their contribution. It demonstrates my skills in **Frontend Development**, **Asynchronous API Integration**, and **Cloud-based Data Management** using Google Apps Script.

The application features a clean, life-saving focused UI with interactive FAQ tabs, real-time registration validation, and a seamless connection to a Google Sheets backend for donor database management.

## Project Overview

* **Blood Donation Campaign** is a modern, responsive web application built with **HTML5, CSS3, and JavaScript**.
* This project showcases my ability to handle **complex form validation**, **dynamic UI components**, and **third-party cloud integrations**.
* **User Interaction Flow:**
    * **Education & Awareness:** Users browse "Why Donate" sections featuring Myth vs. Fact tables and an interactive 4-step donation guide.
    * **Success Stories:** A grid-based "Stories of Hope" section allows users to see the real-world impact of blood donation.
    * **Find a Camp:** Users can view a directory of upcoming donation drives at 9 major Mumbai hospitals (Tata Memorial, KEM, Hinduja, etc.).
    * **Donor Registration:** A smart, modal-based form captures donor details. It includes conditional logic (e.g., showing "Last Donation Date" only if the user has donated before).
    * **Cloud Data Submission:** Upon clicking "Submit," the data is sent via a Fetch API to a Google Apps Script, which logs the entry in a Google Sheet for hospital access.

## Key Features & Concepts Applied

* **Smart Registration Form:** Real-time validation for Age (18-65), Weight (50kg+), and Contact details.
* **Google Sheets Integration:** Serverless backend integration for real-time data logging.
* **Interactive FAQ Tabs:** Organized information architecture using JavaScript-driven tab switching.
* **Conditional Logic:** Dynamic form fields that change based on user input.
* **Responsive Grid Layout:** Optimized hospital directory and success story cards for all device sizes.
* **Modern Styling:** Implementation of linear gradients, hover transitions, and mobile-first design.
* **API Handling:** Vanilla JavaScript Fetch API used for data transmission.

## Folder & File Structure

```text
root/
├─ index.html           # Main Landing Page & Registration Modal
├─ why-donate.html      # Educational content, Myths/Facts, & FAQs
├─ success-stories.html # Success stories and donor testimonials
├─ upcoming-camps.html  # Directory of Mumbai hospital donation camps
├─ style.css            # Global styling, Gradients, and Grid systems
└─ script.js            # Form validation, Tab logic, and Google Sheets API


## Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend/Database:** Google Apps Script (Web App), Google Sheets API
* **Deployment:** Vercel
