// www.omabox.app is attached to the Pages project only to send people to omabox.app: a permanent
// redirect, path and query kept. Everything else passes through. dist/_routes.json (written by
// build.mjs) keeps /media/* from running this at all.
export const onRequest = ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname !== "www.omabox.app") return next();
  url.hostname = "omabox.app";
  return Response.redirect(url.toString(), 301);
};
