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

   # app/controllers/api/v1/todo_items_controller.rb


    def create
      @todo_item = current_user.todo_items.build(todo_item_params)
  
      if authorized?
        respond_to do |format|
          if @todo_item.save
            format.json do
              render :show,
                     status: :created,
                     location: api_v1_todo_item_path(@todo_item)
            end
          else
            format.json do
              render json: @todo_item.errors, status: :unprocessable_entity
            end
          end
        end
      else
        handle_unauthorized
      end
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

    def todo_item_params
      params.require(:todo_item).permit(:title, :complete)
    end
  end
  