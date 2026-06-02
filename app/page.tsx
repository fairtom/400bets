import { prisma } from "../src/lib/prisma";;

export default async function Home() {
  const tournamentCount = await prisma.tournament.count();
  const teamCount = await prisma.team.count();
  const matchCount = await prisma.match.count();
  const userCount = await prisma.user.count();

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>400bets</h1>
      <p>Initial MVP app shell is live.</p>

      <ul>
        <li>Tournaments: {tournamentCount}</li>
        <li>Teams: {teamCount}</li>
        <li>Matches: {matchCount}</li>
        <li>Users: {userCount}</li>
      </ul>
    </main>
  );
}