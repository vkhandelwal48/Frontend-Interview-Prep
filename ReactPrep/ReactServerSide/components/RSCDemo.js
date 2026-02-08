// import ClientDemo from './ClientDemo';

export default async function RSCDemo() {
  console.log('RSCDemo rendered'); //  this console log will only appear on the server or during build time, never in the browser console
  return (
    <div className="rsc">
      <h2>A React Server Component</h2>
      <p>
        Will <strong>ONLY</strong> be rendered on the server or at build time.
      </p>
      <p>
        <strong>NEVER</strong> on the client-side!
      </p>
      {/* <ClientDemo /> */}
    </div>
  );
}