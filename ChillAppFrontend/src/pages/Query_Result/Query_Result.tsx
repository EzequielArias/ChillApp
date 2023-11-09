import { useSearchParams } from "react-router-dom"
import { useFetchAndLoad } from "../../hooks";
import { GetUsersByQuery } from "../../services/query_results";
import { getQueryUsers } from "../../redux/slices";
import { useDispatch, useSelector } from "react-redux";

// Styled-components 
import { QueryResultContainer, 
         ResultSlot, 
         ResultULContainer, 
         ResultIMG, 
         SlotLIItemsContainer, 
         SlotUser
        } from "../../components/styled-components";
import { useEffect } from "react";
import { Progress_bar, Query_result_slot } from "../../components";
import { StoreType } from "../../redux/store";
import { Avatars} from '../../assets';

export const Query_Result = () => {

  const [ query ] = useSearchParams();
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { results } = useSelector((state : StoreType) => state.query_results);

  useEffect(() => {
    const getQueryData = async () => {
      const tk = localStorage.getItem('jwt') as string;
  
      if(query.get('name'))
      {
        const name = query.get('name');
        const { data } = await callEndpoint(GetUsersByQuery(`?name=${name}`, tk));
       dispatch(getQueryUsers(data))
      }
  
      if(query.get('email'))
      {
        const email = query.get('email');
        const { data } = await callEndpoint(GetUsersByQuery(`?email=${email}`, tk));
        dispatch(getQueryUsers(data))
      }
    }

    getQueryData()
  },[])


  return (
    <QueryResultContainer>
      <ResultULContainer>
        {
          (
            loading || results.length === 0 ) 
          ? 
          (
            <Progress_bar loading={loading}/>
          ) 
          :
          (
            <>
              {
                results.map((el) => {
                  return (  
                    <Query_result_slot
                      key={el.id} 
                      el={el} 
                      Avatars={Avatars}
                      />
                  )
                })
              }
            </>
          )
        }
      </ResultULContainer>
    </QueryResultContainer>
  )
}
