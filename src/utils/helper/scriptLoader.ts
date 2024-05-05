export function scriptLoader(url: string) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script#someUniqueId");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.onload = () => {
      resolve('Succeed');
    };
    script.onerror = (e) => {
      reject(e);
    };
    script.id = "someUniqueId";
    script.async = true;
    script.src = url;
    document.head.appendChild(script);
  });
}
