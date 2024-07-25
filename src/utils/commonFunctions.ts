export function parseHTMLToText(htmlString:string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  }

  export function convertTo12HourFormat(time24:any) {
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine AM or PM suffix
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const adjustedHours = hours % 12 || 12;

    // Format minutes to always show two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Format the time string
    return `${adjustedHours}:${formattedMinutes} ${period}`;
}