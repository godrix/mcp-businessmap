import {
  Me,
  ApiLimits,
  Card,
  CardComment,
  CardCommentResponsePost,
  Error,
  CardCoOwners,
  LinkedCards,
  CardSubtasks,
  CardSubtask,
  Boards,
  Board,
  Columns,
  Column,
} from "../model";
import Request from "../utils/request";

const DEFAULT_ERROR = "UNKNOWN_ERROR";
const DEFAULT_MESSAGE_ERROR = "An unknown mistake occurred";
const DEFAULT_REFERENCE_MESSAGE_ERROR = "Check the logs for more details";

class ApiServices extends Request {
  private handleError(error: unknown): {
    error: Error;
  } {
    let errorMessage = DEFAULT_MESSAGE_ERROR;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      error: {
        code: DEFAULT_ERROR,
        message: errorMessage,
        reference: DEFAULT_REFERENCE_MESSAGE_ERROR,
      },
    };
  }

  async getMe(): Promise<{
    data?: Me;
    error?: Error;
  }> {
    try {
      const data = await this.get<Me>("/me");
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getApiLimits(): Promise<{
    data?: ApiLimits;
    error?: Error;
  }> {
    try {
      const data = await this.get<ApiLimits>("/apiLimits");
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCard(cardId: string): Promise<{
    data?: Card;
    error?: Error;
  }> {
    try {
      const data = await this.get<Card>(`/cards/${cardId}`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCards(props: {
    state: string;
    board_ids?: string;
    card_ids?: string;
    owner_user_ids?: string;
    is_blocked: number;
  }): Promise<{
    data?: Card;
    error?: Error;
  }> {
    try {
      const cardIds = props.card_ids ? `&card_ids=${props.card_ids}` : "";
      const boardIds = props.board_ids ? `&board_ids=${props.board_ids}` : "";
      const ownerUserIds = props.owner_user_ids
        ? `&owner_user_ids=${props.owner_user_ids}`
        : "";

      const data = await this.get<Card>(
        `/cards?state=${props.state}&is_blocked=${props.is_blocked}&expand=linked_cards,co_owner_ids,subtasks${cardIds}${boardIds}${ownerUserIds}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCardComments(cardId: string): Promise<{
    data?: CardComment;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardComment>(`/cards/${cardId}/comments`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addCardComment(
    cardId: string,
    comment: string
  ): Promise<{
    data?: CardCommentResponsePost;
    error?: Error;
  }> {
    try {
      const data = await this.post<CardCommentResponsePost>(
        `/cards/${cardId}/comments`,
        {
          text: comment,
        }
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCardComment(
    cardId: string,
    commentId: string
  ): Promise<{
    data?: CardComment;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardComment>(
        `/cards/${cardId}/comments/${commentId}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async updateCardComment(
    cardId: string,
    commentId: string,
    comment: string
  ): Promise<{
    data?: CardComment;
    error?: Error;
  }> {
    try {
      const data = await this.patch<CardComment>(
        `/cards/${cardId}/comments/${commentId}`,
        {
          text: comment,
        }
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteCardComment(
    cardId: string,
    commentId: string
  ): Promise<{
    data?: CardComment;
    error?: Error;
  }> {
    try {
      const data = await this.delete<CardComment>(
        `/cards/${cardId}/comments/${commentId}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCardCoOwners(cardId: string): Promise<{
    data?: CardCoOwners;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardCoOwners>(`/cards/${cardId}/coOwners`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async checkCardCoOwner(
    cardId: string,
    userId: string
  ): Promise<{
    data?: boolean;
    error?: Error;
  }> {
    try {
      await this.get(`/cards/${cardId}/coOwners/${userId}`);
      return { data: true };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async addCardCoOwner(
    cardId: string,
    userId: string
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.put(`/cards/${cardId}/coOwners/${userId}`);
      return { data: "Add a user as a co-owner of a card." };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async removeCardCoOwner(
    cardId: string,
    userId: string
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.delete(`/cards/${cardId}/coOwners/${userId}`);
      return { data: "Remove a user as a co-owner of a card." };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getLinkedCards(cardId: string): Promise<{
    data?: LinkedCards;
    error?: Error;
  }> {
    try {
      const data = await this.get<LinkedCards>(`/cards/${cardId}/linkedCards`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCardSubtasks(cardId: string): Promise<{
    data?: CardSubtasks;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardSubtasks>(`/cards/${cardId}/subtasks`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getCardSubtask(
    cardId: string,
    subtaskId: string
  ): Promise<{
    data?: CardSubtask;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardSubtask>(
        `/cards/${cardId}/subtasks/${subtaskId}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addCardSubtask(
    cardId: string,
    description: string
  ): Promise<{
    data?: CardSubtasks;
    error?: Error;
  }> {
    try {
      const data = await this.post<CardSubtasks>(`/cards/${cardId}/subtasks`, {
        description,
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCardSubtask(
    cardId: string,
    subtaskId: string,
    description: string,
    isFinished: number
  ): Promise<{
    data?: CardSubtask;
    error?: Error;
  }> {
    try {
      const data = await this.patch<CardSubtask>(
        `/cards/${cardId}/subtasks/${subtaskId}`,
        {
          description,
          is_finished: isFinished,
        }
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteCardSubtask(
    cardId: string,
    subtaskId: string
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.delete<CardSubtask>(`/cards/${cardId}/subtasks/${subtaskId}`);
      return { data: "The card subtask has been deleted." };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getBoards(): Promise<{
    data?: Boards;
    error?: Error;
  }> {
    try {
      const data = await this.get<Boards>(`/boards?if_assigned=1`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getBoard(boardId: string): Promise<{
    data?: Board;
    error?: Error;
  }> {
    try {
      const data = await this.get<Board>(`/boards/${boardId}`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getColumns(boardId: string): Promise<{
    data?: Columns;
    error?: Error;
  }> {
    try {
      const data = await this.get<Columns>(`/boards/${boardId}/columns`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getColumn(
    boardId: string,
    columnId: string
  ): Promise<{
    data?: Column;
    error?: Error;
  }> {
    try {
      const data = await this.get<Column>(
        `/boards/${boardId}/columns/${columnId}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const apiServices = new ApiServices();
