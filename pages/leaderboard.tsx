import EarnPoints from "components/leaderboard/EarnPoints";
import EventDescription from "components/leaderboard/EventDescription";
import EventLeaderboard from "components/leaderboard/EventLeaderboard";
import EventName from "components/leaderboard/EventName";
import Progress from "components/leaderboard/Progress";
import Rank from "components/leaderboard/Rank";

export default function LeaderboardPage() {
  return (
    <div className="relative bg-cover bg-no-repeat h-auto">
      <EventName eventName={"Event Name"} time={""} />
      <EventDescription
        eventDescription={
          "Test test test test Test test test test  Test test test test  Test test test test  Test test test test  Test test test test  Test test test test  Test test testTest test test test Test test test test  Test test test test  Test test test test  Test test test test  Test test test test  Test test test test  Test test test "
        }
        title={"Event Info Description"}
      />
      <EarnPoints points={12} />
      <Progress currentPoints={500} milestoneEarned={4} />
      <EventLeaderboard />
      <Rank />
    </div>
  );
}
