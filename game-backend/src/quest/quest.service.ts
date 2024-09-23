import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestEntity } from './quest.entity';
import { QuestDto } from './dtos/quest.dto';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class QuestService {
    constructor(@InjectRepository(QuestEntity) private questRepository: Repository<QuestEntity>, @InjectRepository(UserEntity) private teamRepository: Repository<UserEntity>) { }

    async getAllQuests(): Promise<QuestEntity[]> {
        return this.questRepository.find({ relations: ['team'] });
    }

    async addNewQuest(quest: QuestDto): Promise<QuestEntity> {
        // Find the team using the provided team_id
        const team = await this.teamRepository.findOne({ where: { id: quest.team_id } });

        if (!team) {
            throw new HttpException("Team not found", HttpStatus.NOT_FOUND);
        }

        // Create a new quest entity
        const newQuest = this.questRepository.create({
            ...quest,
            team, // Explicitly associate the team with the new quest
        });

        // Save the quest to the database
        return await this.questRepository.save(newQuest);
    }

    async completeQuest(id: number, complete: boolean): Promise<QuestEntity[]> {
        // Load the quest along with its associated team
        const quest = await this.questRepository.findOne({
            where: { id },
            relations: ['team'], // Make sure the team relation is loaded
        });

        if (!quest) {
            throw new Error('Quest not found');
        }

        const team = quest.team; // Access the related team directly

        if (!team) {
            throw new HttpException("Team not found", HttpStatus.NOT_FOUND);
        }

        // Update the team's points and mark the quest as done
        if (quest.done === complete) {
            throw new HttpException(
                'This quest is already completed',
                HttpStatus.CONFLICT,
            );
        }

        team.points += complete ? quest.points : -quest.points;
        quest.done = complete
        console.log(team)

        // Save the updated team and quest
        await this.teamRepository.save(team);
        await this.questRepository.save(quest);
        return this.questRepository.find({ relations: ['team'] });
    }





    async deleteQuestById(id: number): Promise<void> {
        await this.questRepository.delete(id);
    }

    async findQuestByTeamId(team_id: number): Promise<QuestEntity[]> {
        const team = await this.teamRepository.findOne({ where: { id: team_id } });
        if (!team) {
            throw new Error('Team not found');
        }
        return this.questRepository
            .createQueryBuilder('quest')
            .select(['quest.id', 'quest.name', 'quest.description', 'quest.points', 'quest.done']) // Select only the id column
            .where('quest.team_id = :teamId', { teamId: team.id }) // Use team_id condition
            .getMany(); // Fetch the results
    }

}
