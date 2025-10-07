const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwJsq7Mg8mUtLPPCyLGUwBYIYk8H6IbW_sqpzvMZE2U6t8oVNIEutsf7QgmZUgL4XxXbA/exec"; // Replace with your Google Apps Script Web App URL

// --- Custom Alert ---
function showCustomAlert(message) {
  const overlay = document.createElement('div');
  overlay.className = 'custom-alert-overlay';
  const box = document.createElement('div');
  box.className = 'custom-alert-box';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerText = 'X';
  closeBtn.onclick = () => document.body.removeChild(overlay);
  const content = document.createElement('div');
  content.id = 'alert-message-content';
  content.innerText = message;
  const okBtn = document.createElement('button');
  okBtn.className = 'register-btn';
  okBtn.innerText = 'OK';
  okBtn.onclick = () => document.body.removeChild(overlay);
  box.appendChild(closeBtn);
  box.appendChild(content);
  box.appendChild(okBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// --- Form Functions ---
function showForm() {
  document.getElementById("registrationForm").reset();
  document.getElementById("last-donation-container").style.display = "none";
  document.getElementById("illness-details").style.display = "none";
  const checkboxGroups = ["gender","blood-group","illness","donated","hospital"];
  checkboxGroups.forEach(name => {
    document.getElementsByName(name).forEach(cb => cb.checked=false);
  });
  document.getElementById("form-overlay").style.display = "flex";
}

function closeForm() { document.getElementById("form-overlay").style.display = "none"; }

function handleSingleChoiceCheckbox(checkbox) {
  const group = document.getElementsByName(checkbox.name);
  group.forEach(cb => { if(cb!==checkbox) cb.checked=false; });
}

function handleDonatedCheckbox(checkbox) {
  handleSingleChoiceCheckbox(checkbox);
  document.getElementById('last-donation-container').style.display = (checkbox.checked && checkbox.value==='Yes')?'block':'none';
}

// --- Initialize Checkbox Logic ---
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementsByName('gender').forEach(cb=>cb.onclick=()=>handleSingleChoiceCheckbox(cb));
  document.getElementsByName('blood-group').forEach(cb=>cb.onclick=()=>handleSingleChoiceCheckbox(cb));
  document.getElementsByName('illness').forEach(cb=>{
    cb.onclick=()=>{
      handleSingleChoiceCheckbox(cb);
      const details=document.getElementById('illness-details');
      details.style.display=(cb.checked && cb.value==='Yes')?'block':'none';
      details.required=(cb.checked && cb.value==='Yes');
    }
  });
  document.getElementById('illness-details').style.display='none';
  document.getElementById('illness-details').required=false;
});

// --- FAQ Tabs ---
const tabs=document.querySelectorAll(".faq-tab");
const panels=document.querySelectorAll(".faq-panel");
tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    const target=tab.dataset.tab;
    tabs.forEach(t=>t.classList.remove("active"));
    panels.forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`.faq-panel[data-panel="${target}"]`).classList.add("active");
  });
});

// --- Form Validation ---
function validateForm(){
  const name=document.getElementById("name").value.trim();
  const age=document.getElementById("age").value.trim();
  const email=document.getElementById("email").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const weight=document.getElementById("weight").value.trim();
  const address=document.getElementById("address").value.trim();
  const gender=document.querySelector('input[name="gender"]:checked');
  const bloodGroup=document.querySelector('input[name="blood-group"]:checked');
  const donated=document.querySelector('input[name="donated"]:checked');
  const hospital=document.querySelector('input[name="hospital"]:checked');
  const illness=document.querySelector('input[name="illness"]:checked');
  const consent=document.querySelector('input[name="consent"]:checked');

  const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern=/^[0-9]{10}$/;

  if(!name){showCustomAlert("Enter your full name."); return false;}
  if(!age || age<18 || age>65){showCustomAlert("Age must be 18-65."); return false;}
  if(!gender){showCustomAlert("Select your gender."); return false;}
  if(!emailPattern.test(email)){showCustomAlert("Enter valid email."); return false;}
  if(!phonePattern.test(phone)){showCustomAlert("Phone number should be 10 digits."); return false;}
  if(!address){showCustomAlert("Enter your address."); return false;}
  if(!weight || weight<50){showCustomAlert("Weight must be at least 50kg."); return false;}
  if(!bloodGroup){showCustomAlert("Select your blood group."); return false;}
  if(!illness){showCustomAlert("Indicate recent illnesses."); return false;}
  if(illness && illness.value==="Yes" && !document.getElementById("illness-details").value.trim()){
    showCustomAlert("Specify your illness details."); return false;
  }
  if(!donated){showCustomAlert("Indicate if you donated before."); return false;}
  if(donated && donated.value==="Yes" && !document.getElementById("last-donation").value){
    showCustomAlert("Select last donation date."); return false;
  }
  if(!hospital){showCustomAlert("Select at least one hospital."); return false;}
  if(!consent){showCustomAlert("Provide your consent."); return false;}
  return true;
}

// --- Form Submission ---
async function submitForm(event){
  event.preventDefault();
  if(!validateForm()) return;

  const data={
  name: document.getElementById("name").value.trim(),
  age: document.getElementById("age").value.trim(),
  gender: document.querySelector('input[name="gender"]:checked').value,
  email: document.getElementById("email").value.trim(),
  phone: document.getElementById("phone").value.trim(),
  address: document.getElementById("address").value.trim(),
  weight: document.getElementById("weight").value.trim(),
  bloodGroup: document.querySelector('input[name="blood-group"]:checked').value,
  illness: document.querySelector('input[name="illness"]:checked').value,
  illnessDetails: document.getElementById("illness-details").value.trim(),
  donated: document.querySelector('input[name="donated"]:checked').value,
  lastDonation: document.getElementById("last-donation").value,
  hospitals: Array.from(document.querySelectorAll('input[name="hospital"]:checked')).map(cb=>cb.value).join(', '),
  consent: document.querySelector('input[name="consent"]:checked') ? document.querySelector('input[name="consent"]:checked').value : "No"
};


  try{
    await fetch("https://script.google.com/macros/s/AKfycbwJsq7Mg8mUtLPPCyLGUwBYIYk8H6IbW_sqpzvMZE2U6t8oVNIEutsf7QgmZUgL4XxXbA/exec", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(data)
});

    showCustomAlert("Thanks for registering! Your data has been saved successfully.");
    closeForm();
  }catch(e){
    showCustomAlert("Error submitting the form. Try again.");
  }
}

// --- Open Cards ---
function openInNewTab(url){ window.open(url,"_blank"); }
