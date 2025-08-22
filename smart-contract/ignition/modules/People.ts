
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PersonModule = buildModule("PeopleModule", (m) => {

  const person = m.contract("People");

  return { person };
});

export default PersonModule;
