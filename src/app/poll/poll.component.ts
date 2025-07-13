import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CreatePollRequest = Omit<Poll, 'id'>;

@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  newPoll: CreatePollRequest = {
    question: '',
    options: [
      { optionText: '', voteCount: 0 },
      { optionText: '', voteCount: 0 },
    ],
  };

  polls: Poll[] = [];
  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (err) => {
        console.error('Error fetching polls', err);
      },
    });
  }

  // Saved in backend and then come to UI
  castingVote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        // Update the local poll data after voting
        const poll = this.polls.find((p) => p.id === pollId);
        if (poll) {
          poll.options[optionIndex].voteCount++;
        }
      },
      error: (err) => {
        console.error('Error voting for poll', err);
      },
    });
  }
  createPoll() {
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (err) => {
        console.error('Error creating poll', err);
      },
    });
  }

  addOption() {
    this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }

  removeOption(index: number) {
    if (this.newPoll.options.length > 2) {
      this.newPoll.options.splice(index, 1);
    } else {
      alert('At least two options are required.');
    }
  }

  resetPoll() {
    this.newPoll = {
      question: '',
      options: [
        { optionText: '', voteCount: 0 },
        { optionText: '', voteCount: 0 },
      ],
    };
  }

  trackByIndex(index: number): number {
    return index;
  }
}

//
// castingVote(pollId: number, optionIndex: number) {
//   const poll = this.polls.find((p) => p.id === pollId);
//   if (poll) {
//     // Optimistically update the UI
//     poll.options[optionIndex].voteCount++;

//     this.pollService.vote(pollId, optionIndex).subscribe({
//       next: () => {
//         console.log('Vote registered successfully');
//       },
//       error: (err) => {
//         console.error('Error voting for poll', err);
//         // Revert the UI update if voting fails
//         poll.options[optionIndex].voteCount--;
//       },
//     });
//   }
// }
