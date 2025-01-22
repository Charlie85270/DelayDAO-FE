import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentVotes() {
  const votes = [
    {
      id: 1,
      title: "Proposal 1",
      account: "account_rdx128...pyl",
      vote: "against",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
    },
    {
      id: 2,
      title: "Proposal 2",
      account: "account_rdx128...pyl",
      vote: "for",
      description: "Increase the DAO's treasury by 10%",
      amount: 430000,
    },
    {
      id: 3,
      title: "Proposal 3",
      account: "account_rdx128...pyl",
      vote: "against",
      description: "Increase the DAO's treasury by 10%",
      amount: 30000,
    },
    {
      id: 4,
      title: "Proposal 4",
      account: "account_rdx128...pyl",
      vote: "for",
      description: "Increase the DAO's treasury by 10%",
      amount: 2300000,
    },
    {
      id: 5,
      title: "Proposal 5",
      account: "account_rdx128...pyl",
      vote: "against",
      description: "Increase the DAO's treasury by 10%",
      amount: 234550,
    },
  ];

  return (
    <div className="space-y-8">
      {votes.map((vote) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/" alt="Avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{vote.account}</p>
            <p className="text-sm text-muted-foreground">{vote.description}</p>
          </div>
          <div className="flex ml-auto  flex-col justify-end items-end">
            <p className="text-sm text-muted-foreground">
              {vote.vote === "for" ? "For" : "Against"}
            </p>
            <div
              className={`font-medium ${
                vote.vote === "for" ? "text-green-600" : "text-red-600"
              }`}
            >
              {vote.amount} $DELAY
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
