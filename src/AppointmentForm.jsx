import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CalendarCheck, MessageCircle, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP = '2348080821226';
const SERVICES = [
  'Dental checkup / consultation', 'Scaling and polishing', 'Teeth whitening',
  'Gum care', 'Denture consultation', 'Braces consultation',
  'Tooth pain / urgent assessment', 'Other / not sure',
];
const initialValues = {
  patient_name: '', patient_phone: '', patient_email: '', visit_area: '',
  visit_address: '', dental_service: '', urgency: 'Routine appointment',
  preferred_date: '', preferred_time: '', patient_note: '', consent: false,
};
const fieldClass = 'mt-2 block w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';
const labelClass = 'block text-sm font-bold text-slate-800';

export default function AppointmentForm() {
  const formRef = useRef(null);
  const submittingRef = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [whatsappURL, setWhatsappURL] = useState('');
  const update = (event) => {
    const { name, value, checked, type } = event.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (result) setResult(null);
  };
  const minDate = new Date().toLocaleDateString('en-CA');

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current || !formRef.current?.reportValidity()) return;
    if (!values.consent) { setResult({ kind: 'error', message: 'Please agree to be contacted about your appointment.' }); return; }
    submittingRef.current = true;
    setSending(true);
    setResult(null);

    const message = [
      '*ROYALSMILE — NEW APPOINTMENT REQUEST*', '',
      `Patient: ${values.patient_name.trim()}`,
      `Phone: ${values.patient_phone.trim()}`,
      `Email: ${values.patient_email.trim() || 'Not provided'}`,
      `Area / City: ${values.visit_area.trim()}`,
      `Visit location: ${values.visit_address.trim() || 'To be confirmed'}`,
      `Requested service: ${values.dental_service}`,
      `Priority: ${values.urgency}`,
      `Preferred date: ${values.preferred_date || 'Flexible'}`,
      `Preferred time: ${values.preferred_time || 'Flexible'}`,
      `Notes: ${values.patient_note.trim() || 'None'}`, '',
      'Please confirm availability and whether a home visit is suitable. I understand this is a request, not a confirmed booking.',
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    setWhatsappURL(url);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    let sent = false;
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
        sent = true;
      } catch (error) {
        console.error('RoyalSmile email notification failed:', error);
      }
    } else {
      console.warn('RoyalSmile EmailJS keys missing — set the three VITE_EMAILJS_* environment variables.');
    }
    setResult(sent
      ? { kind: 'success', message: 'Appointment request emailed to RoyalSmile. Please also send the prepared WhatsApp message so the team can confirm your booking.' }
      : { kind: 'warning', message: 'We could not confirm email delivery. Your request is ready on WhatsApp — please send it there to contact the team.' });
    setSending(false);
    submittingRef.current = false;
  }

  return (
    <section id="appointment" className="scroll-mt-28 bg-slate-50 px-4 py-20 sm:px-6" aria-labelledby="appointment-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">Your dental care, your schedule</p>
          <h2 id="appointment-heading" className="mt-3 text-4xl font-extrabold text-slate-950 md:text-5xl">Request a Home Dental Appointment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Tell us what you need. Our team will confirm availability, suitability for a home visit, and any applicable fees before your appointment.</p>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="rounded-3xl bg-blue-800 p-8 text-white shadow-xl">
              <CalendarCheck size={34} aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-extrabold">Less waiting. More comfort.</h3>
              <p className="mt-3 leading-7 text-blue-100">Skip an unnecessary trip through traffic for services we can safely provide at home. A qualified dental professional assesses your needs and explains suitable next steps.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm"><ShieldCheck className="text-blue-700" /><h3 className="mt-3 text-lg font-bold">Your care comes first</h3><p className="mt-2 text-sm leading-6 text-slate-600">Some examinations and procedures require a clinic or hospital. The team will advise if home treatment is appropriate.</p></div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><AlertCircle className="text-amber-700" /><h3 className="mt-3 font-bold text-slate-900">Urgent dental problem?</h3><p className="mt-2 text-sm leading-6 text-slate-700">For uncontrolled bleeding, significant facial swelling, difficulty breathing or swallowing, or major facial trauma, seek urgent in-person emergency care now. This website does not provide emergency dispatch.</p></div>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello RoyalSmile, I would like to enquire about a home dental appointment.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white px-5 py-4 font-bold text-green-800 hover:bg-green-50"><MessageCircle size={20} /> Ask a question on WhatsApp</a>
          </div>
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8 [overflow-anchor:none]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Full name *<input className={fieldClass} name="patient_name" autoComplete="name" value={values.patient_name} onChange={update} maxLength={100} required placeholder="Your full name" /></label>
                <label className={labelClass}>Phone / WhatsApp *<input className={fieldClass} name="patient_phone" type="tel" autoComplete="tel" value={values.patient_phone} onChange={update} minLength={7} maxLength={25} required placeholder="080..." /></label>
              </div>
              <label className={labelClass}>Email (optional)<input className={fieldClass} type="email" name="patient_email" autoComplete="email" value={values.patient_email} onChange={update} placeholder="you@example.com" /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Area / city *<input className={fieldClass} name="visit_area" value={values.visit_area} onChange={update} required maxLength={100} placeholder="e.g. Lekki, Lagos" /></label>
                <label className={labelClass}>Service needed *<select className={fieldClass} name="dental_service" value={values.dental_service} onChange={update} required><option value="">Select a service</option>{SERVICES.map(x => <option key={x}>{x}</option>)}</select></label>
              </div>
              <label className={labelClass}>Home-visit address (optional — can confirm privately later)<textarea className={fieldClass} rows={2} name="visit_address" value={values.visit_address} onChange={update} maxLength={250} placeholder="Estate or street; full address is optional at this stage" /></label>
              <label className={labelClass}>How soon do you need help? *<select className={fieldClass} name="urgency" value={values.urgency} onChange={update} required><option>Routine appointment</option><option>As soon as possible — dental discomfort</option><option>Flexible / just enquiring</option></select></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Preferred date (optional)<input className={fieldClass} name="preferred_date" type="date" min={minDate} value={values.preferred_date} onChange={update} /></label>
                <label className={labelClass}>Preferred time (optional)<select className={fieldClass} name="preferred_time" value={values.preferred_time} onChange={update}><option value="">Flexible</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
              </div>
              <label className={labelClass}>Additional note (optional)<textarea className={fieldClass} name="patient_note" rows={3} maxLength={300} value={values.patient_note} onChange={update} placeholder="Briefly describe your request. Please avoid sharing sensitive medical history here." /></label>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" checked={values.consent} onChange={update} name="consent" className="mt-1 h-5 w-5 shrink-0 accent-blue-700" required /><span>I agree that RoyalSmile may contact me about this appointment request by phone, WhatsApp, or email. *</span></label>
              <input type="hidden" name="booking_subject" value="New RoyalSmile appointment request" />
              <input type="hidden" name="booking_summary" value={`Service: ${values.dental_service}; Area: ${values.visit_area}; Priority: ${values.urgency}; Date: ${values.preferred_date || 'Flexible'}; Time: ${values.preferred_time || 'Flexible'}`} />
              <button type="submit" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 text-lg font-extrabold text-white shadow-md hover:bg-green-700 disabled:cursor-wait disabled:opacity-60"><CalendarCheck size={22} /> {sending ? 'Sending appointment request...' : 'Request My Appointment'}</button>
              <p className="text-center text-xs leading-5 text-slate-500">Submitting is an enquiry, not a confirmed booking. Please complete the WhatsApp step shown afterwards.</p>
              {result && <div role="status" aria-live="polite" className={`rounded-2xl border p-5 ${result.kind === 'success' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}><div className="flex gap-2"><CheckCircle2 className="shrink-0 text-green-700" size={21} /><p className="text-sm font-semibold text-slate-800">{result.message}</p></div><a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#128C3E] px-4 py-3 font-bold text-white"><MessageCircle size={19} /> Send Booking on WhatsApp</a><p className="mt-2 text-center text-xs text-slate-600">WhatsApp opens with your details filled in. Please press Send.</p></div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
