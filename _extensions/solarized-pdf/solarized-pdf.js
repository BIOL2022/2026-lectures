window.RevealSolarizedPdf = function () {
  return {
    id: "solarized-pdf",
    init: function () {
      const params = new URLSearchParams(window.location.search);
      if (params.has("solarized")) {
        document.documentElement.classList.add("solarized-pdf");
      }
    }
  };
};
