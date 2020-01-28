
module.exports= query=(page= true, feed= false,records=1)=>{
  let Page =`
  page(records: ${records}){
    timestamp
    page_id
    page_name
    page_alias
    img_profile_url
    img_cover_url
    page_category
    data{
      date
      page_fans
      page_likes
      page_posts_impressions
      page_impressions
      page_impressions_organic
      page_impressions_paid
      page_impressions_unique
      page_impressions_viral
      page_engaged_users
      page_post_engagements
      page_clics
      page_fan_removes
      page_fan_adds
      page_visits
      page_inbox_time_response
      page_inbox_response_level
      page_message_count
      page_followers
      page_fans_gender_age{
        key
        value
      }
      page_fans_by_like_source{
        key
        value
      }
      page_fans_country{
        key
        value
      }
      page_fans_city{
        key
        value
      }
      page_views_external_referrals{
        key
        value
      }
      page_video_views_by_paid_non_paid{
        key
        value
      }
      marketing{
        campaign_id
        clicks
        ctr
        impressions
        reach
        spend
        account_currency
        date_start
        date_stop
        unique_clicks
        unique_ctr
        frequency
        relevance_score
        post_promoted
      }
    }
  }

  `

  let Feed = `     
  feed {
    page_id
    timestamp
    data {
      post_id
      post_shares_count
      post_content
      post_image
      post_type
      post_date
      post_url
      post_author_id
      post_author_name
      post_author_picture
      post_impressions
      post_impressions_unique
      post_video_views
      post_video_views_10s
      post_video_views_unique
      post_clicks
      post_reactions_like_total
      post_reactions_love_total
      post_reactions_wow_total
      post_reactions_haha_total
      post_reactions_sorry_total
      post_reactions_anger_total
      post_promotion_status
      post_promotable_id
      post_comments_count
      post_comments {
        comment_id
        comment_author_id
        comment_content
        comment_date
        comment_reactions
      }
    }
  }`
return `{
  facebook{
    ${page? Page : ''}
   
    ${feed? Feed : ''}
    
  }
}`

} 
