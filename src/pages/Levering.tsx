

export function Levering() {
  return (
    <div>
      <h1>Levering</h1>
      <form className="input-column">
        <label>
          Navn:
          <input type="text" name="navn" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Telefonnummer:
          <input type="tel" name="telefonnummer" />
        </label>
        <label>
          Adresse 1:
          <input type="text" name="adresse1" />
        </label>
        <label>
          Adresse 2:
          <input type="text" name="adresse2" />
        </label>
        <label>
          Postnummer:
          <input type="text" name="postnummer" />
        </label>
        <label>
          By:
          <input type="text" name="by" />
        </label>
        <label>
          Land:
          <input type="text" name="land" />
        </label>
      </form>
    </div>
  );
}