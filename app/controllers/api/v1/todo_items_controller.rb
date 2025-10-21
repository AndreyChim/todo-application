class Api::V1::TodoItemsController < ApplicationController
    def index
      @todo_items = TodoItem.all
    end
  
    def show
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
  end
  