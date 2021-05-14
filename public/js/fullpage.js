let listEvent = document.querySelector(".wrapper");



listEvent?.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(" event t =>", event.target);
  console.log("  id = ", event.target.parentNode.id);
  // const response = await fetch(`/event/${event.target.id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  window.location = `/events/${event.target.parentNode.id}`;
  // const responseJson = await response.json();
});
