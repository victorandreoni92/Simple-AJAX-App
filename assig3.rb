# Victor Andreoni
# CS4241 - Assignment 3
# Index Ruby file to use with sinatra as server

$: << File.expand_path(File.dirname(__FILE__) + "/lib") #Add lib folder to path

require 'sinatra'
require 'update_target'

get '/' do 
  # Generate random numbers for the upper and lower limits, as well as
  # for the target
  
  @upper = 100 + Random.rand(21) #Generate upper between 100 and 120
  @lower = Random.rand(21) #Generate lower between 0 and 20
  @target = @lower + Random.rand((@upper + 1) - @lower) # Generate target between lower and upper
                                                        # Add 1 to upper to make range inclusive
  erb :index
end

get '/updateTarget' do
  # Call ruby function to update target value
  update_target_value(params["upper"], params["lower"]) # Get parameters from route hash
end
