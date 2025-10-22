class Api::V1::TodoItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo_item, only: %i[show edit update destroy]

    def index
      @todo_items = current_user.todo_items.all
    end

    def edit
    end
  
    def show
      if authorized?
        respond_to { |format| format.json { render :show } }
      else
        handle_unauthorized
      end
    end

    def create
    end
  
    def update
    end
  
    def destroy
    end
  
    private
  
    def set_todo_item
      @todo_item = TodoItem.find(params[:id])
    end

    def authorized?
      @todo_item.user == current_user
    end

    def handle_unauthorized
      unless authorized?
        respond_to { |format| format.json { render :unauthorized, status: 401 } }
      end
    end
  end
  