// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import VoteButton from "@/islands/VoteButton.tsx";
import { getUserDisplayName, Item, User, type Vote } from "@/utils/db.ts";

export function pluralize(unit: number, label: string) {
  return unit === 1 ? `${unit} ${label}` : `${unit} ${label}s`;
}

/** @todo Replace with https://deno.land/std@0.184.0/datetime/mod.ts?s=difference */
export function timeAgo(time: number | Date) {
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600) return pluralize(~~(between / 60), "minute");
  else if (between < 86400) return pluralize(~~(between / 3600), "hour");
  else return pluralize(~~(between / 86400), "day");
}

export interface ItemSummaryProps {
  item: Item;
  user: User;
  commentsCount: number;
  isVoted: boolean;
}

export default function ItemSummary(props: ItemSummaryProps) {
  return (
    <div class="py-2">
      <div>
        <VoteButton
          item={props.item}
          isVoted={props.isVoted}
        />
        <span class="mr-2">
          <a href={props.item.url}>{props.item.title}</a>
        </span>
        <span class="text-gray-500">
          {new URL(props.item.url).host}
        </span>
      </div>
      <div class="text-gray-500">
        <span id={`score-${props.item.id}`}>
          {pluralize(props.item.score, "point")}
        </span>{" "}
        by {getUserDisplayName(props.user)}{" "}
        {timeAgo(new Date(props.item.createdAt))} ago •{" "}
        <a href={`/item/${props.item.id}`}>
          {pluralize(props.commentsCount, "comment")}
        </a>
      </div>
    </div>
  );
}
