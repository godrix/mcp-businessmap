import {
  User,
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
  Lanes,
  Lane,
  CreateLaneParams,
  Workspace,
  Workspaces,
  BoardStructure,
  BlockReasons,
  CardBlockReason,
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
    data?: User;
    error?: Error;
  }> {
    try {
      const data = await this.get<User>("/me");
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
  async createCard(cardData: {
    board_id?: number;
    workflow_id?: number;
    column_id: number;
    lane_id: number;
    title: string;
    description: string;
    priority: number;
    owner_user_id?: number;
  }): Promise<{
    data?: Card;
    error?: Error;
  }> {
    try {

      const queryParams = new URLSearchParams();
      if (cardData.board_id) {
        queryParams.append('board_id', cardData.board_id.toString());
      }
      if (cardData.workflow_id) {
        queryParams.append('workflow_id', cardData.workflow_id.toString());
      }
      
      const requestBody = {
        column_id: cardData.column_id,
        lane_id: cardData.lane_id,
        title: cardData.title,
        description: cardData.description,
        priority: cardData.priority,
        ...(cardData.owner_user_id && { owner_user_id: cardData.owner_user_id }),
      };

      const url = queryParams.toString() ? `/cards?${queryParams.toString()}` : '/cards';
      const data = await this.post<Card>(url, requestBody);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async updateCard(
    card_id: string,
    title: string,
    description: string,
    assignee_ids: string,
    priority: number,
    column_id: number,
    lane_id: number
  ): Promise<{
    data?: Card;
    error?: Error;
  }> {
    try {
      const data = await this.patch<Card>(`/cards/${card_id}`, {
        title,
        description,
        assignee_ids,
        priority,
        column_id,
        lane_id,
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteCard(cardId: string): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.delete<Card>(`/cards/${cardId}`);
      return { data: "The card has been deleted" };
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
    description: string,
    owner_user_id?: number,
    is_finished?: number,
    deadline?: string,
    position?: number
  ): Promise<{
    data?: CardSubtask;
    error?: Error;
  }> {
    try {
      const requestBody: any = { description };
      if (owner_user_id !== undefined) requestBody.owner_user_id = owner_user_id;
      if (is_finished !== undefined) requestBody.is_finished = is_finished;
      if (deadline !== undefined) requestBody.deadline = deadline;
      if (position !== undefined) requestBody.position = position;

      const data = await this.post<CardSubtask>(`/cards/${cardId}/subtasks`, requestBody);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCardSubtask(
    cardId: string,
    subtaskId: string,
    description?: string,
    isFinished?: number,
    owner_user_id?: number,
    deadline?: string,
    position?: number
  ): Promise<{
    data?: CardSubtask;
    error?: Error;
  }> {
    try {
      const requestBody: any = {};
      if (description !== undefined) requestBody.description = description;
      if (isFinished !== undefined) requestBody.is_finished = isFinished;
      if (owner_user_id !== undefined) requestBody.owner_user_id = owner_user_id;
      if (deadline !== undefined) requestBody.deadline = deadline;
      if (position !== undefined) requestBody.position = position;

      const data = await this.patch<CardSubtask>(
        `/cards/${cardId}/subtasks/${subtaskId}`,
        requestBody
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
  async getUser(user_id: string): Promise<{
    data?: User;
    error?: Error;
  }> {
    try {
      const data = await this.get<User>(`/users/${user_id}`);
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
  
  async getWorkspace(
    workspaceId: string
  ): Promise<{
    data?: Workspace;
    error?: Error;
  }> {
    try {
      const data = await this.get<Workspace>(
        `/workspaces/${workspaceId}`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getWorkspaces(props?: {
    is_archived?: number;
    if_assigned_to_boards?: number;
  }): Promise<{
    data?: Workspaces;
    error?: Error;
  }> {
    try {
      const params = new URLSearchParams();
      if (props?.is_archived !== undefined) {
        params.append("is_archived", props.is_archived.toString());
      }
      if (props?.if_assigned_to_boards !== undefined) {
        params.append("if_assigned_to_boards", props.if_assigned_to_boards.toString());
      }
      const query = params.toString();
      const data = await this.get<Workspaces>(
        query ? `/workspaces?${query}` : "/workspaces"
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createWorkspace(name: string, type?: number): Promise<{
    data?: Workspace;
    error?: Error;
  }> {
    try {
      const data = await this.post<Workspace>("/workspaces", {
        name,
        ...(type !== undefined && { type }),
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateWorkspace(
    workspaceId: string,
    updates: { name?: string; is_archived?: number }
  ): Promise<{
    data?: Workspace;
    error?: Error;
  }> {
    try {
      const data = await this.patch<Workspace>(
        `/workspaces/${workspaceId}`,
        updates
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBoardStructure(boardId: string): Promise<{
    data?: BoardStructure;
    error?: Error;
  }> {
    try {
      const data = await this.get<BoardStructure>(
        `/boards/${boardId}/currentStructure`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createColumn(
    boardId: string,
    params: {
      position: number;
      name: string;
      workflow_id?: number;
      section?: number;
      parent_column_id?: number;
      description?: string;
      color?: string;
      limit?: number;
    }
  ): Promise<{
    data?: Column;
    error?: Error;
  }> {
    try {
      const data = await this.post<Column>(
        `/boards/${boardId}/columns`,
        params
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateColumn(
    boardId: string,
    columnId: string,
    params: {
      position?: number;
      name?: string;
      section?: number;
      parent_column_id?: number;
      description?: string;
      color?: string;
      limit?: number;
    }
  ): Promise<{
    data?: Column;
    error?: Error;
  }> {
    try {
      const data = await this.patch<Column>(
        `/boards/${boardId}/columns/${columnId}`,
        params
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteColumn(
    boardId: string,
    columnId: string,
    options?: {
      move_cards_to_column_id?: number;
      move_metrics_to_column_id?: number;
    }
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      const params = new URLSearchParams();
      if (options?.move_cards_to_column_id !== undefined) {
        params.append(
          "move_cards_to_column_id",
          options.move_cards_to_column_id.toString()
        );
      }
      if (options?.move_metrics_to_column_id !== undefined) {
        params.append(
          "move_metrics_to_column_id",
          options.move_metrics_to_column_id.toString()
        );
      }
      const query = params.toString();
      await this.delete<Column>(
        query
          ? `/boards/${boardId}/columns/${columnId}?${query}`
          : `/boards/${boardId}/columns/${columnId}`
      );
      return { data: "The column has been deleted" };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createCardsMany(
    cards: Record<string, unknown>[],
    options?: { exceeding_reason?: string; reporter_user_id?: number }
  ): Promise<{
    data?: unknown;
    error?: Error;
  }> {
    try {
      const data = await this.post("/cards/createMany", {
        cards,
        ...options,
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCardsMany(
    cards: Record<string, unknown>[],
    options?: { exceeding_reason?: string; reporter_user_id?: number }
  ): Promise<{
    data?: unknown;
    error?: Error;
  }> {
    try {
      const data = await this.post("/cards/updateMany", {
        cards,
        ...options,
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteCardsMany(
    cardIds: number[],
    options?: { exceeding_reason?: string }
  ): Promise<{
    data?: unknown;
    error?: Error;
  }> {
    try {
      const data = await this.post("/cards/deleteMany", {
        card_ids: cardIds,
        ...options,
      });
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getBlockReasons(): Promise<{
    data?: BlockReasons;
    error?: Error;
  }> {
    try {
      const data = await this.get<BlockReasons>("/blockReasons?is_enabled=1");
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCardBlockReason(cardId: string): Promise<{
    data?: CardBlockReason;
    error?: Error;
  }> {
    try {
      const data = await this.get<CardBlockReason>(
        `/cards/${cardId}/blockReason`
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async blockCard(
    cardId: string,
    params: {
      reason_id: number;
      comment?: string;
      users?: number[];
      date?: string;
    }
  ): Promise<{
    data?: CardBlockReason;
    error?: Error;
  }> {
    try {
      const data = await this.put<CardBlockReason>(
        `/cards/${cardId}/blockReason`,
        params
      );
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unblockCard(cardId: string): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.delete(`/cards/${cardId}/blockReason`);
      return { data: "The card has been unblocked" };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async linkChildCard(
    parentCardId: string,
    childCardId: string,
    params?: {
      linked_card_position?: number;
      card_position?: number;
      exceeding_reason?: string;
    }
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.put(
        `/cards/${parentCardId}/children/${childCardId}`,
        params ?? {}
      );
      return { data: "Child card linked successfully" };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unlinkChildCard(
    parentCardId: string,
    childCardId: string,
    exceeding_reason?: string
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      const query = exceeding_reason
        ? `?exceeding_reason=${encodeURIComponent(exceeding_reason)}`
        : "";
      await this.delete(
        `/cards/${parentCardId}/children/${childCardId}${query}`
      );
      return { data: "Child card link removed successfully" };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async linkParentCard(
    childCardId: string,
    parentCardId: string,
    params?: {
      linked_card_position?: number;
      card_position?: number;
      exceeding_reason?: string;
    }
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.put(
        `/cards/${childCardId}/parents/${parentCardId}`,
        params ?? {}
      );
      return { data: "Parent card linked successfully" };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unlinkParentCard(
    childCardId: string,
    parentCardId: string,
    exceeding_reason?: string
  ): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      const query = exceeding_reason
        ? `?exceeding_reason=${encodeURIComponent(exceeding_reason)}`
        : "";
      await this.delete(
        `/cards/${childCardId}/parents/${parentCardId}${query}`
      );
      return { data: "Parent card link removed successfully" };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async getLanes(boardId: string): Promise<{
    data?: Lanes;
    error?: Error;
  }> {
    try {
      const data = await this.get<Lanes>(`/boards/${boardId}/lanes`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async getLane(laneId: string): Promise<{
    data?: Lane;
    error?: Error;
  }> {
    try {
      const data = await this.get<Lane>(`/lanes/${laneId}`);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async createLane(
    boardId: string,
    params: CreateLaneParams
  ): Promise<{
    data?: Lane;
    error?: Error;
  }> {
    try {
      const data = await this.post<Lane>(`/boards/${boardId}/lanes`, params);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async updateLane(
    laneId: string,
    params: Partial<CreateLaneParams>
  ): Promise<{
    data?: Lane;
    error?: Error;
  }> {
    try {
      const data = await this.patch<Lane>(`/lanes/${laneId}`, params);
      return { data };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  async deleteLane(laneId: string): Promise<{
    data?: string;
    error?: Error;
  }> {
    try {
      await this.delete<Lane>(`/lanes/${laneId}`);
      return { data: "The lane has been deleted" };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const apiServices = new ApiServices();
