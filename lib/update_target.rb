# Victor Andreoni
# CS4241 - Assignment 3

# Function to update target number when called via AJAX

# Function to update the target value of the program.
# Target value will be between range established by
# upper and lower

#@param upper upper bound of guessing range
#@param lower lower bound of guessing range
def update_target_value(upper, lower)
  @lower = lower.to_i # Parse arguments to function
  @upper = upper.to_i
  @target = @lower + Random.rand((@upper + 1) - @lower) # Generate new target between lower and upper
                                                        # Add 1 to upper to make range inclusive
  
  return @target.to_s #Convert to string so that http response is properly set
  
end